import { taggedEndpointsFactory } from "adapters/config/http/EndpointFactory";
import { services } from "app";
import { UpdateUserSchema, UserSchema } from "core/entities/user.entity";
import { withMeta } from "express-zod-api";

export const updateUser = taggedEndpointsFactory.build({
  tag: "users",
  method: "put",
  shortDescription: "Actualizacion de usuarios",
  description: "Actualizacion de usuarios",
  input: withMeta(UpdateUserSchema),
  output: withMeta(UserSchema),
  handler: async ({ input, options, logger }) => {
    logger.debug("Options1:", options);
    const userCreated = await services.user.update(input);
    return userCreated;
  },
});
