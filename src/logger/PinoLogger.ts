import { ILogger } from "./Logger";
import pino from "pino";

export const logger: (logLevel: string) => ILogger = (logLevel: string) => {
  return pino({
    level: logLevel,
  });
};
