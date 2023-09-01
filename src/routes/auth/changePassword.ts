import { services } from "app";
import { endpointFactory } from "config/http/Endpoint";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const changePassword = endpointFactory.auth.build({
  tag: "auth",
  method: "put",
  shortDescription: "Cambiar password",
  description: "Cambiar password",
  input: z.object({
    password: z.string(),
  }),
  output: withMeta(z.object({})),
  handler: async ({ input, options, logger }) => {
    await services.auth.updatePassword(options.user.id, input.password);
    return {};
  },
});
