import { userRoutes } from "./users";
import { Routing } from "express-zod-api";
import { Services } from "services/index";

export const routes = (services: Services) => {
  const routing: Routing = {
    v1: {
      user: userRoutes(services),
    },
  };
  return routing;
};
