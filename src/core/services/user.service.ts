import { ILogger } from "config/logger";
import { CoreError, Errors } from "core/entities/Error";
import { PaginatedParams } from "core/entities/Pagination";
import { User } from "core/entities/User";
import { IAuthRepository } from "core/repositories/auth.repository";
import { IModelRepository } from "core/repositories/model.repository";

export class UserService {
  constructor(
    private readonly logger: ILogger,
    private readonly authRepository: IAuthRepository,
    // private readonly checkoutRepository: ICheckoutRepository,
    private readonly userRepository: IModelRepository<User>
  ) {}

  async save(user: User) {
    const log = this.logger.child({ function: "save" });
    log.info("creating user");

    const userExists = await this.userRepository.find({
      email: user.email,
    });
    if (userExists) {
      log.error({ user }, "usuario existente");
      throw new CoreError(Errors.ALREADY_EXIST, `El usuario ya existe`);
    }

    // const cryptoCheckoutAccountId = await this.checkoutRepository.createAccount('algo')

    const roleName = "user";
    const newUser = await this.userRepository.save({
      ...user,
      cryptoCheckoutAccountId: "123idtochange",
    });
    await this.authRepository.createUser({
      username: newUser.id,
      password: user.password,
      email: user.email,
      roleName,
    });

    return newUser;
  }

  async getProfile(id: string) {
    const log = this.logger.child({ function: "getProfile" });
    log.info({ id }, "get profile");
    const user = await this.userRepository.find({ _id: id });
    return user;
  }

  async signIn(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: username });
    const auth = await this.authRepository.signIn(user.id, password);
    if (!auth.jwt)
      throw new CoreError(Errors.BAD_CREDENTIALS, `credenciales incorrectas`);

    return auth;
  }

  getAll(options: PaginatedParams) {
    const log = this.logger.child({ function: "getAll" });
    log.info("get users");
    return this.userRepository.getAll(options);
  }

  async update(id: string, data: User) {
    const log = this.logger.child({ function: "update" });
    log.info({ id }, "updating user");
    if (data.email) {
      const userExists = await this.userRepository.find({
        email: data.email,
      });
      if (userExists) {
        log.error({ email: data.email }, "usuario existente");
        throw new CoreError(Errors.ALREADY_EXIST, `El correo ya existe`);
      }
    }
    return this.userRepository.save({ ...data, id });
  }
  updatePassword(id: string, password: string) {
    const log = this.logger.child({ function: "update-password" });
    log.info({ id }, "updating user");

    return this.authRepository.updateUser({
      username: id,
      password: password,
    });
  }

  async find(criteria: object) {
    const log = this.logger.child({ function: "find" });
    log.info("find user");
    const user = await this.userRepository.find(criteria);
    if (!user) throw new CoreError(Errors.NOT_FOUND, `El usuario no existe`);
    return user;
  }

  async search(criteria: object) {
    const log = this.logger.child({ function: "search" });
    log.info("search");
    const user = await this.userRepository.find(criteria);
    return user;
  }

  async remove(id: string) {
    const log = this.logger.child({ function: "remove" });
    log.info({ id }, "remove");
    await this.find({ _id: id });
    await Promise.all([
      this.userRepository.delete(id),
      this.authRepository.deleteUser(id),
    ]);
  }

  refreshToken(refreshToken: string) {
    throw new CoreError(
      Errors.NOT_IMPLEMENTED,
      `refresh token not implemented`
    );
  }
  getOTP(username: string) {
    return this.authRepository.createOTP(username);
  }

  async isAuthorized(token: string, permission: string) {
    const log = this.logger.child({ function: "isAuthorized" });
    try {
      const user = await this.authRepository.getUser(token);
      const hasPermission = await this.authRepository.hasPermission(
        token,
        user.username,
        permission
      );
      if (!hasPermission) throw new Error("user has not permission");
      user.username = user.username.replace("crypto-checkout-v2-", "");
      return user;
    } catch (error: any) {
      log.error({ error }, "error");
      throw new CoreError(Errors.UNAUTHORIZED, error.message || "unauthorized");
    }
  }
}
