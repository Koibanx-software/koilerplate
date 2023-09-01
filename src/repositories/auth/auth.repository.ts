import { IAuthRepository } from "./auth.interface.repository";
import { IConfig } from "config";
import { authSdk, buildConfig, buildSdk } from "config/build";
import { ILogger } from "config/logger/Logger";
import {
  AccessToken,
  AuthUser,
  CreateAuthUser,
  UpdateAuthUser,
} from "entities/auth.entity";
import jwt_decode from "jwt-decode";
import { CoreError } from "utils/Errors";

export class AuthError extends Error {
  public readonly code: string;
  public readonly details: any;
  constructor(code: string, message: any = "") {
    super();
    this.code = code;
    this.message = message;
  }
}

export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly logger: ILogger,
    private readonly config: IConfig
  ) {}

  private manageErrors(err: any) {
    const error = err as AuthError;
    switch (error.details) {
      case "Expirated token":
        return new CoreError("TOKEN_EXPIRED", "token expirado");

      default:
        return new CoreError("NOT_FOUND", "error al obtener usuario");
    }
  }

  async createUser(dataUser: CreateAuthUser): Promise<AuthUser> {
    await authSdk.users.createUser({
      username: dataUser.username,
      password: dataUser.password,
    });
    const assignedRole = await authSdk.users.assignRole({
      roleName: dataUser.roleName,
      username: dataUser.username,
    });

    assignedRole.password = "";
    return assignedRole as AuthUser;
  }

  async updateUser(dataUser: UpdateAuthUser): Promise<AuthUser> {
    const updatedUser = await authSdk.users.editUser({
      username: dataUser.username,
      password: dataUser.password,
    });
    this.logger.info({ username: dataUser.username }, "User updated");

    return updatedUser as AuthUser;
  }

  async getUser(token: string): Promise<AuthUser> {
    try {
      const localAuth = await buildSdk.auth({
        headers: { Authorization: token },
      });
      const getUser = await localAuth.users.getUser();
      this.logger.info({ username: getUser.username }, "Get user");
      return {
        ...getUser,
        username: getUser.username.replace("crypto-checkout-v2-", ""),
      } as AuthUser;
    } catch (err) {
      this.logger.error({ err }, "error on get user repository");
      throw this.manageErrors(err);
    }
  }

  async deleteUser(username: string): Promise<AuthUser> {
    const deletedUser = await authSdk.users.deleteUser(username);
    this.logger.info({ username }, "User deleted");

    return deletedUser as AuthUser;
  }

  async hasPermission(
    username: string,
    permissionName: string
  ): Promise<boolean> {
    try {
      console.log(username, permissionName);
      const permission = await authSdk.users.hasPermission({
        username,
        permissionName,
      });
      this.logger.info(
        { username, permissionName, hasPermission: permission },
        "Permissions"
      );

      return permission;
    } catch (error) {
      this.logger.warn({ error }, "Error hasPermission");
      return false;
    }
  }

  async signIn(username: string, password: string): Promise<AccessToken> {
    const code = Buffer.from(`${username}:${password}`).toString("base64");
    const auth = await buildSdk.auth({
      headers: { ...buildConfig, authorization: `Basic ${code}` },
    });
    const signIn = await auth.userAccess.createTemporalToken();
    const decoded = jwt_decode(signIn.jwt) as any;
    if (!decoded.userid) {
      this.logger.warn({ username }, "Failed sign in");
      return { jwt: undefined } as any;
    }

    this.logger.info({ username }, "Success sign in");
    return signIn;
  }

  async createRole(roleName: string): Promise<void> {
    await authSdk.roles.createRole({ roleName });
    await authSdk.roles.addPermissionToRole({
      permissionName: "hasPermission",
      roleName,
    });
  }

  async addPermission(roleName: string, permissionName: string): Promise<void> {
    await authSdk.permissions.createPermission({ permissionName });
    await authSdk.roles.addPermissionToRole({ permissionName, roleName });
  }

  async createOTP(username: string): Promise<String> {
    try {
      const expiryDate = new Date(Date.now() + 2 * (60 * 60 * 1000)); // TODO: use dayJs
      const otp = await authSdk.userAccess.createTemporalPassword({
        username,
        expiration: expiryDate,
      });
      return otp.temporalPassword;
    } catch (error: any) {
      this.logger.error(error);
      throw new CoreError("SERVER_ERROR");
    }
  }
}
