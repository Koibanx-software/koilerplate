import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Repositories } from "adapters/repositories";
import { ILogger } from "logger/Logger";

export interface Services {
  user: UserService;
  auth: AuthService;
}
export const getServices = (
  logger: ILogger,
  repository: Repositories
): Services => {
  const user = new UserService(logger.child({ service: "user" }), repository);
  const auth = new AuthService(logger.child({ service: "auth" }), repository);
  return {
    user,
    auth,
  };
};
