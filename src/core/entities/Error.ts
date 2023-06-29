import { AnyZodObject, ZodError } from "zod";

export enum Errors {
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  INVALID_PARAMETERS = "INVALID_PARAMETERS",
  ALREADY_EXIST = "ALREADY_EXIST",
  NOT_FOUND = "NOT_FOUND",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  SERVER_ERROR = "SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  BAD_PARAMETERS = "BAD PARAMETERS",
}

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
      throw new CoreError(Errors.BAD_PARAMETERS, error);
    }
  }
};
