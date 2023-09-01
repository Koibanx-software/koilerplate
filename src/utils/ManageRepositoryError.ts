import { CoreError, Errors } from "utils/Errors";

export function manageRepositoryError(error: any): CoreError {
  if (error instanceof CoreError) {
    throw new CoreError(error.code as Errors, error.message);
  }
  throw new CoreError("SERVER_ERROR");
}
