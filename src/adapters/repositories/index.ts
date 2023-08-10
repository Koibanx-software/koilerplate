//DONT REMOVE KOIGEN PURPOSES:  IMPORT-REPOSITORY
import { AuthRepository } from "./auth.build.repository";
import { MongoDBRepository } from "./model.repository";
import {
  UserDocument,
  userSchema,
} from "adapters/config/mongo/schemas/user.schema";
import { IConfig } from "config";
import { ILogger } from "logger/Logger";

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
