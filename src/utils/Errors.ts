import { AnyZodObject, ZodError } from "zod";

export type Errors =
  | "NOT_IMPLEMENTED"
  | "INVALID_PARAMETERS"
  | "ALREADY_EXIST"
  | "NOT_FOUND"
  | "BAD_CREDENTIALS"
  | "TOKEN_EXPIRED"
  | "SERVER_ERROR"
  | "UNAUTHORIZED"
  | "BAD PARAMETERS";

export class CoreError extends Error {
  public readonly code: string;
  public readonly details: any;
  constructor(code: Errors, message: any = "") {
    super();
    this.code = code;
    this.message = message;
  }
}

export const schemaValidation = (schema: AnyZodObject, data: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new CoreError("BAD PARAMETERS", error);
    }
  }
};
