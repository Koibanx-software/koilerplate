import { ILogger } from "./logger/Logger";
import { logger } from "config/logger/PinoLogger";
import * as dotenv from "dotenv";
import { cleanEnv, json, str } from "envalid";

dotenv.config();

//TODO: VERIFIcar la viabilidad de consumirlo por process
const env = cleanEnv(process.env, {
  MONGO_URI: str({ desc: "uri de la base de datos de mongodb" }),
  BUILD_SECRET: str({ desc: "secret de build koibanx" }),
  BUILD_API_KEY: str({ desc: "api key build koibanx" }),
  HTTP_PORT: json({ desc: "Puerto para la api" }),
  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    desc: "nivel a partir de el cual el logger imprimira en consola los logs",
  }),
});

export type IConfig = {
  build: {
    apiKey: string;
    secret: string;
  };
  mongo: {
    uri: string;
  };
  http: {
    port: string;
  };
  baseLogger: ILogger;
};

export const configVars = {
  baseLogger: logger(env.LOG_LEVEL),
  build: {
    apiKey: env.BUILD_API_KEY,
    secret: env.BUILD_SECRET,
  },
  http: {
    port: env.HTTP_PORT,
  },
  mongo: {
    uri: env.MONGO_URI,
  },
};
