import { UserRepository } from "./user";
import { IConfig } from "config";
import { ILogger } from "config/logger/Logger";
import { User } from "entities/user.entity";

export interface Repositories {}
export const getRepositories = (
  logger: ILogger,
  config: IConfig
): Repositories => {
  return {};
};
