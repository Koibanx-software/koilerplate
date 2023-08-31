import { HTTPConfig } from ".";
import { services } from "app";
import { configVars } from "config";
import { EndpointsFactory, InputValidationError } from "express-zod-api";
import { createHttpError, createMiddleware } from "express-zod-api";
import {
  createResultHandler,
  getMessageFromError,
  getStatusCodeFromError,
  IOSchema,
} from "express-zod-api";
import fs from "fs";
import jwt from "jsonwebtoken";
import { CoreError } from "utils/Errors";
import { z } from "zod";

function present(status: number, error: CoreError, res: any) {
  return res.status(status).json({
    status,
    error: {
      reason: error.code,
      msg: error.message,
    },
  });
}
function presentZodError(status: number, err: any, res: any) {
  return res.status(status).json({
    status,
    error: {
      reason: "INPUT_ERROR",
      msg: err,
    },
  });
}
export const yourResultHandler = createResultHandler({
  getPositiveResponse: (output: IOSchema) => ({
    schema: z.object({}),
    mimeType: "application/json", // optinal, or mimeTypes for array
  }),
  getNegativeResponse: () => z.object({}),
  handler: ({ error, input, output, request, response, logger }) => {
    console.log(input);
    if (!error) {
      response.json(output);
      return output;
    }
    const statusCode = getStatusCodeFromError(error);
    const message = getMessageFromError(error);
    console.log("error", error, statusCode);
    if (error instanceof InputValidationError) {
      presentZodError(401, message, response);
    }
    const err = error as CoreError;
    switch (err.code) {
      case "INVALID_PARAMETERS":
        return present(400, err, response);
      case "BAD_PARAMETERS":
        return present(400, err, response);
      case "ALREADY_EXIST":
        return present(400, err, response);
      case "NOT_FOUND":
        return present(404, err, response);
      case "BAD_CREDENTIALS":
        return present(403, err, response);
      case "AUTHORIZED":
        return present(401, err, response);
      case "TOKEN_EXPIRED":
        return present(401, err, response);
      case "SERVER_ERROR":
        return present(500, err, response);
      case "NOT_IMPLEMENTED":
        return present(500, err, response);
      default:
        return present(500, new CoreError("SERVER_ERROR"), response);
    }
  },
});

export const taggedEndpointsFactory = new EndpointsFactory({
  resultHandler: yourResultHandler,
  config: HTTPConfig,
});

const authMiddleware = createMiddleware({
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
const authStoreTokenMiddleware = createMiddleware({
  security: {
    and: [{ type: "header", name: "Authorization" }],
  },
  input: z.object({}), // means no inputs
  middleware: async ({ request }) => {
    try {
      const token = request.headers.authorization?.replace("JWT ", "");
      if (!token) {
        throw createHttpError(400, "falta el token");
      }
      const cert = fs.readFileSync("jwtRSA256-public.pem");
      const store = jwt.verify(token, cert);
      return {
        headers: {
          ...request.headers,
          token,
        },
        store,
      };
    } catch (err) {
      console.log(err);
      throw createHttpError(400, "token no encontrado");
    }
  },
});

export const authEndpointsFactory =
  taggedEndpointsFactory.addMiddleware(authMiddleware);
export const authStoreEndpointsFactory = taggedEndpointsFactory.addMiddleware(
  authStoreTokenMiddleware
);
