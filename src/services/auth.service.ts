import { ILogger } from "config/logger/Logger";
import { Repositories } from "repositories";
import { CoreError } from "utils/Errors";

export class AuthService {
  constructor(
    private readonly logger: ILogger,
    private readonly repositories: Repositories
  ) {}

  async getProfile(id: string) {
    const log = this.logger.child({ function: "getProfile" });
    log.info({ id });
    const userAuthFinded = await this.repositories.auth.getUser(id);
    const user = await this.repositories.user.findOne({
      _id: userAuthFinded.username,
    });
    return user;
  }

  async signIn(username: string, password: string) {
    const user = await this.repositories.user.findOne({
      email: username,
    });
    const auth = await this.repositories.auth.signIn(user.id, password);
    if (!auth.jwt) {
      throw new CoreError("BAD_CREDENTIALS", `credenciales incorrectas`);
    }

    return auth;
  }

  updatePassword(id: string, password: string) {
    const log = this.logger.child({ function: "update-password" });
    log.info({ id, password }, "updating user");
    return this.repositories.auth.updateUser({
      username: id,
      password: password,
    });
  }

  async getOTP(email: string) {
    const log = this.logger.child({ function: "getOtp" });
    const userFinded = await this.repositories.user.findOne({ email });
    const otpCode = (
      await this.repositories.auth.createOTP(userFinded.id)
    ).toString();
    log.info({ otpCode }, "otp");
    return otpCode;
  }
  async forgotPassword(email: string) {
    const userFinded = await this.repositories.user.findOne({ email });
    const otp = (
      await this.repositories.auth.createOTP(userFinded.id)
    ).toString();
    const token = await this.signIn(email, otp);
    const link = `https://store-pointv2.dev.build.koibanx.com/change-password?token=${token.jwt}`;
  }

  async isAuthorized(token: string, permission: string) {
    const log = this.logger.child({ function: "isAuthorized" });
    try {
      const user = await this.repositories.auth.getUser(token);
      const hasPermission = await this.repositories.auth.hasPermission(
        user.username,
        permission
      );
      if (!hasPermission) throw new Error("user has not permission");
      user.username = user.username.replace("crypto-checkout-v2-", "");
      return user;
    } catch (error: any) {
      log.error({ error }, "error");
      throw new CoreError("UNAUTHORIZED", error.message || "unauthorized");
    }
  }
}
