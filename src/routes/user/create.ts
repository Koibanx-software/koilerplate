import { services } from "app";
import { endpointFactory } from "config/http/Endpoint";
import { CreateUserSchema, UserSchema } from "entities/user.entity";
import { withMeta } from "express-zod-api";

export const userCreate = endpointFactory.tagged.build({
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
});
