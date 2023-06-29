import pino from "pino";
import { ILogger } from ".";

export const logger: (logLevel: string) => ILogger = (logLevel: string) => {
  return pino({
    level: logLevel,
  });
};
