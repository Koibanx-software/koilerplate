import { generateSchema } from "@anatine/zod-openapi";
import {
  Description,
  Summary,
  OpenApiResponse,
  BodyContent,
} from "@decorators/express-openapi";
import { z } from "zod";

export const decodeBasicCredentials = (
  basicCredentials: string
): { username: string; password: string } => {
  const decodeData = Buffer.from(
    basicCredentials.replace("Basic", ""),
    "base64"
  ).toString("utf-8");
  const [username, password] = decodeData.split(":");
  return { username, password };
};

export const encodeBasicCredentials = (
  username: string,
  password: string
): string => {
  const token = username + ":" + password;
  return `Basic ${Buffer.from(token).toString("base64")}`;
};

export const combineDecorators = (...decorators: Function[]): Function => {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    decorators.forEach((decorator) => decorator(target, key, descriptor));
  };
};

export const ApiDocsDecorator: Function = (
  summary: string,
  description: string,
  bodySchema: z.ZodSchema<any> | undefined,
  responseSchemas: { status: number; schema?: z.ZodSchema<any> }[]
) => {
  const schemas = responseSchemas.map((responseSchema) => {
    if (!responseSchema.schema) {
      return OpenApiResponse(responseSchema.status, "Accepted");
    }
    return OpenApiResponse(
      responseSchema.status,
      "json/application",
      generateSchema(responseSchema.schema)
    );
  });
  const bodyContent = bodySchema
    ? [BodyContent("json/application", generateSchema(bodySchema))]
    : [];
  return combineDecorators(
    Summary(summary),
    Description(description),
    ...bodyContent,
    ...schemas
  );
};
