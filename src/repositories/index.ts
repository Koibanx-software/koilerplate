import { IAuthRepository } from "./auth/auth.interface.repository";
import { AuthRepository } from "./auth/auth.repository";
import { UserRepository } from "./user";
import { userSchema } from "./user/user.schema";
import { IConfig } from "config";
import { ILogger } from "config/logger/Logger";
import { IMongoRepository } from "config/mongo/model.repository";
import { User } from "entities/user.entity";

export interface Repositories {
  auth: IAuthRepository;
  user: IMongoRepository<User>;
}
export const getRepositories = (
  logger: ILogger,
  config: IConfig
): Repositories => {
  const auth = new AuthRepository(logger.child({ repository: "auth" }), config);
  const user = new UserRepository("user", userSchema);

  return {
    auth,
    user,
  };
};
