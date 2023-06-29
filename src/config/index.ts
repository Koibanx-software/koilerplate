import * as dotenv from "dotenv";
import { cleanEnv, json, str } from "envalid";
import { ILogger } from "./logger";
import { logger } from "./logger/Pino";

dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_URI: str({ desc: "uri de la base de datos de mongodb" }),
  BUILD_SECRET: str({ desc: "secret de build koibanx" }),
  BUILD_API_KEY: str({ desc: "api key build koibanx" }),
  BITGO_TRADING_ACCOUNT: str({ desc: "bitgo trading account" }),
  BITGO_ACCESS_TOKEN: str({ desc: "bitgo access token" }),
  BITGO_ENTERPRISE: str({ desc: "bitgo enterprise" }),
  HTTP_PORT: json({ desc: "Puerto para la api" }),
  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    desc: "nivel a partir de el cual el logger imprimira en consola los logs",
  }),
  AWS_BUCKET_REGION: str({ desc: "region de aws" }),
  AWS_BUCKET_ACCESS_KEY: str({ desc: "access key de aws" }),
  AWS_BUCKET_SECRET_KEY: str({ desc: "secret key de aws" }),
  AWS_BUCKET_PUBLIC: str({ desc: "bucket publico de aws" }),
  AWS_BUCKET_PRIVATE: str({ desc: "bucket privado de aws" }),
  AWS_BUCKET_PATH: str({ desc: "path de aws" }),
});

export type IConfig = {
  build: {
    apiKey: string;
    secret: string;
  };
  bitgo: {
    tradingAccount: string;
    accessToken: string;
    enterprise: string;
  };
  mongo: {
    uri: string;
  };
  http: {
    port: string;
  };
  baseLogger: ILogger;
  aws: {
    region: string;
    accessKey: string;
    secretKey: string;
    bucketPublic: string;
    bucketPrivate: string;
    path: string;
  };
};

export const configVars = {
  baseLogger: logger(env.LOG_LEVEL),
  build: {
    apiKey: env.BUILD_API_KEY,
    secret: env.BUILD_SECRET,
  },
  bitgo: {
    tradingAccount: env.BITGO_TRADING_ACCOUNT,
    accessToken: env.BITGO_ACCESS_TOKEN,
    enterprise: env.BITGO_ENTERPRISE,
  },
  http: {
    port: env.HTTP_PORT,
  },
  mongo: {
    uri: env.MONGO_URI,
  },
  aws: {
    region: env.AWS_BUCKET_REGION,
    accessKey: env.AWS_BUCKET_ACCESS_KEY,
    secretKey: env.AWS_BUCKET_SECRET_KEY,
    bucketPublic: env.AWS_BUCKET_PUBLIC,
    bucketPrivate: env.AWS_BUCKET_PRIVATE,
    path: env.AWS_BUCKET_PATH,
  },
};
