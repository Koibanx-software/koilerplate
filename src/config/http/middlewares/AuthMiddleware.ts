import { services } from "app";
import { createHttpError, createMiddleware } from "express-zod-api";
import { z } from "zod";

export const authMiddleware = createMiddleware({
  security: {
    and: [{ type: "header", name: "Authorization" }],
  },
  input: z.object({}), // means no inputs
  middleware: async ({ request }) => {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw createHttpError(400, "invalid token");
    }
    const user = await services.auth.getProfile(token);
    if (!user) {
      throw createHttpError(400, "user de token no encontrado");
    }
    return {
      headers: {
        ...request.headers,
        token,
      },
      user,
    };
  },
});
