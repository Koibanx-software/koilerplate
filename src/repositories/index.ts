//DONT REMOVE KOIGEN PURPOSES:  IMPORT-REPOSITORY
import { AuthRepository } from "./auth/auth.repository";
import { UserRepository } from "./user";
import { UserDocument, userSchema } from "./user/user.schema";
import { IConfig } from "config";
import { ILogger } from "config/logger/Logger";
import { MongoDBRepository } from "config/mongo/model.repository";

export interface Repositories {
  auth: AuthRepository;
  user: MongoDBRepository<UserDocument>;
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
