import { UserService } from "./user.service";
import { ILogger } from "config/logger/Logger";
import { Repositories } from "repositories";

export interface Services {
  user: UserService;
}
export const getServices = (
  logger: ILogger,
  repository: Repositories
): Services => {
  const user = new UserService(logger.child({ service: "user" }), repository);
  return {
    user,
  };
};
