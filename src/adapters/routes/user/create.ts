import { taggedEndpointsFactory } from "adapters/config/http/EndpointFactory";
import { services } from "app";
import { UserSchema } from "core/entities/user.entity";
import { withMeta } from "express-zod-api";

export const userCreate = taggedEndpointsFactory.build({
  tag: "users",
  method: "post",
  shortDescription: "Creacion de usuarios",
  description: "Creacion de usuarios",
  input: withMeta(UserSchema),
  output: withMeta(UserSchema),
  handler: async ({ input, options, logger }) => {
    logger.debug("Options1:", options);
    const userCreated = await services.user.create(input, true);
    return userCreated;
  },
});
