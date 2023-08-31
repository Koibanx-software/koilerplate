import { services } from "app";
import { authEndpointsFactory } from "config/http/EndpointFactory";
import { UserSchema } from "entities/user.entity";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const profileGet = authEndpointsFactory.build({
  tag: "auth",
  method: "get",
  shortDescription: "Obtener perfil",
  description: "Obtener perfil",
  input: z.object({}),
  output: withMeta(UserSchema),
  handler: async ({ options }) => {
    await services.auth.isAuthorized(options.headers.token, "profile");
    return options.user;
  },
});
