import { taggedEndpointsFactory } from "adapters/config/http/EndpointFactory";
import { services } from "app";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const authOTP = taggedEndpointsFactory.build({
  tag: "auth",
  method: "post",
  shortDescription: "Envio OTP",
  description: "Envio de One time password",
  input: withMeta(
    z.object({
      email: z.string({ required_error: "email requerido" }).email(),
    })
  ),
  output: withMeta(
    z.object({
      otp: z.any(),
    })
  ),
  handler: async ({ input, options, logger }) => {
    logger.debug("Options2:", options);
    const otp = await services.auth.getOTP(input.email);
    return { otp };
  },
});
