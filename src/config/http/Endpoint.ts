import { HTTPConfig } from ".";
import { authMiddleware } from "./middlewares";
import { EndpointsFactory, InputValidationError } from "express-zod-api";
import {
  createResultHandler,
  getMessageFromError,
  getStatusCodeFromError,
  IOSchema,
} from "express-zod-api";
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
const yourResultHandler = createResultHandler({
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

const taggedEndpointsFactory = new EndpointsFactory({
  resultHandler: yourResultHandler,
  config: HTTPConfig,
});

const authEndpointsFactory =
  taggedEndpointsFactory.addMiddleware(authMiddleware);

export const endpointFactory = {
  tagged: taggedEndpointsFactory,
  auth: authEndpointsFactory,
};
