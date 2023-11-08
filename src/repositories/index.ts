import { UserRepository } from "./user";
import { userSchema } from "./user/user.schema";
import { IConfig } from "config";
import { ILogger } from "config/logger/Logger";
import { IMongoRepository } from "config/mongo/model.repository";
import { User } from "entities/user.entity";

export interface Repositories {
  user: IMongoRepository<User>;
}
export const getRepositories = (
  logger: ILogger,
  config: IConfig
): Repositories => {
  const user = new UserRepository("user", userSchema);

  return {
    user,
  };
};
