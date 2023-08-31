//DONT REMOVE KOIGEN PURPOSES:  IMPORT-REPOSITORY
import { AuthRepository } from "./auth/auth.build.repository";
import { MongoDBRepository } from "./model.repository";
import { IConfig } from "config";
import { ILogger } from "config/logger/Logger";
import { UserDocument, userSchema } from "config/mongo/schemas/user.schema";

export interface Repositories {
  auth: AuthRepository;
  userModel: MongoDBRepository<UserDocument>;
}
export const getRepositories = (
  logger: ILogger,
  config: IConfig
): Repositories => {
  const auth = new AuthRepository(logger.child({ repository: "auth" }), config);
  const userModel = new MongoDBRepository<UserDocument>("user", userSchema);

  return {
    auth,
    userModel,
  };
};
