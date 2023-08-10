import { authEndpointsFactory } from "adapters/config/http/EndpointFactory";
import { services } from "app";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const balanceUser = authEndpointsFactory.build({
  tag: "users",
  method: "get",
  shortDescription: "Obtener balance",
  description: "Obtener balance",
  input: z.object({}),
  output: withMeta(
    z.object({
      balance: z.number(),
    })
  ),
  handler: async ({ input, options, logger }) => {
    logger.debug("Options1:", options);
    const balance = await services.user.getBalance(
      options.user.cryptoCheckoutAccountId
    );
    return { balance };
  },
});
