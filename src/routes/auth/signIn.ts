import { services } from "app";
import { endpointFactory } from "config/http/Endpoint";
import { withMeta } from "express-zod-api";
import { z } from "zod";

export const signIn = endpointFactory.tagged.build({
  tag: "auth",
  method: "post",
  shortDescription: "Inicio de sesion",
  description: "inicio de sesion",
  input: z.object({
    username: z.string(),
    password: z.string(),
  }),
  output: withMeta(
    z.object({
      jwt: z.string(),
      expiration: z.number(),
      refresh: z.string(),
      refreshExpiration: z.number(),
    })
  ).example({
    jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NDlhMDE0OGVlNGE4MjAwMTJhZDZlOGUiLCJhcGlLZXkiOiI1Y2I2ZWE5OC1kY2IwLTQ4MWItYTlkOC0yYzkwOWQyMDU5OWQiLCJhcHBpZCI6IjY0ODc2ZjIyZGQ5YzI1MDAxMjAwODg4ZCIsImV4cGlyYXRpb24iOjE2ODg3NjY4MDMsImlhdCI6MTY4NzkwMjgwM30.QnhGvhKQWzLAcR3QapDOD67PdI1DPJ0qcbs9vVh7cg2dgOSCI-rpX1CyIX6yy9cCtGmRd8xN7rjXrXwRroBpBaixzA9xt4nvKb-mpTjzlT88PPX8SEqTwhfh_XKsynwgBA_9dMwjuxXd8h3yC_0mSQQ8x8nOI1tRRSGqPz8kZYoBtLgFKTPnbvoaWaMYMr7f-_0k9AEQRjMflr8q7YBSJmFu5uv-zupjJoJynCnu--wFKEdsZbDIFNvPzc1NG1YS_o8jwWiQg_8c-AoGtKQvXXmhN1mJ608ygW4Ak4CZ5vl0t0F3jxoiMWfBqeqjHOeCcDAfBOKT3DCS9uLZ9UL1a",
    expiration: 1688766803,
    refresh:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NDlhMDE0OGVlNGE4MjAwMTJhZDZlOGUiLCJhcGlLZXkiOiI1Y2I2ZWE5OC1kY2IwLTQ4MWItYTlkOC0yYzkwOWQyMDU5OWQiLCJhcHBpZCI6IjY0ODc2ZjIyZGQ5YzI1MDAxMjAwODg4ZCIsImV4cGlyYXRpb24iOjE2ODg3NjY4MDMsImlhdCI6MTY4NzkwMjgwM30.QnhGvhKQWzLAcR3QapDOD67PdI1DPJ0qcbs9vVh7cg2dgOSCI-rpX1CyIX6yy9cCtGmRd8xN7rjXrXwRroBpBaixzA9xt4nvKb-mpTjzlT88PPX8SEqTwhfh_XKsynwgBA_9dMwjuxXd8h3yC_0mSQQ8x8nOI1tRRSGqPz8kZYoBtLgFKTPnbvoaWaMYMr7f-_0k9AEQRjMflr8q7YBSJmFu5uv-zupjJoJynCnu--wFKEdsZbDIFNvPzc1NG1YS_o8jwWiQg_8c-AoGtKQvXXmhN1mJ608ygW4Ak4CZ5vl0t0F3jxoiMWfBqeqjHOeCcDAfBOKT3DCS9uLZ9UL1a",
    refreshExpiration: 1688766803,
  }),
  handler: async ({ input, options, logger }) => {
    logger.debug("login handler");
    const { username, password } = input;
    const auth = await services.auth.signIn(username, password);
    return auth;
  },
});
