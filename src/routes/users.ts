import {
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
} from "entities/user.entity";
import { defaultEndpointsFactory, DependsOnMethod } from "express-zod-api";
import { withMeta } from "express-zod-api";
import { Services } from "services/index";

export const userRoutes = (services: Services) => {
  return new DependsOnMethod({
    post: defaultEndpointsFactory.build({
      tag: "users",
      method: "post",
      shortDescription: "Creacion de usuarios",
      description: "Creacion de usuarios",
      input: withMeta(CreateUserSchema),
      output: withMeta(UserSchema),
      handler: async ({ input, options, logger }) => {
        logger.debug("Options1:", options);
        const userCreated = await services.user.create(input);
        return userCreated;
      },
    }),
    put: defaultEndpointsFactory.build({
      tag: "users",
      method: "put",
      shortDescription: "Actualizacion de usuarios",
      description: "Actualizacion de usuarios",
      input: withMeta(UpdateUserSchema),
      output: withMeta(UserSchema),
      handler: async ({ input, options, logger }) => {
        const userCreated = await services.user.update(input);
        return userCreated;
      },
    }),
  });
};
