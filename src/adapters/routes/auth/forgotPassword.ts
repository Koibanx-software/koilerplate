import { taggedEndpointsFactory } from "adapters/config/http/EndpointFactory";
import { services } from "app";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const forgotPassword = taggedEndpointsFactory.build({
  tag: "auth",
  method: "post",
  shortDescription: "password olvidado",
  description: "password olvidado",
  input: z.object({
    email: z.string(),
  }),
  output: withMeta(z.object({})),
  handler: async ({ input, options, logger }) => {
    await services.auth.forgotPassword(input.email);
    return {};
  },
});
