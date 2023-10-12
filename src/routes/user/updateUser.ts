import { services } from "app";
import { endpointFactory } from "config/http/Endpoint";
import { UpdateUserSchema, UserSchema } from "entities/user.entity";
import { withMeta } from "express-zod-api";

export const updateUser = endpointFactory.tagged.build({
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
});
