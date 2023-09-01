import { configVars } from "config";
import { openBuildConnection } from "config/build";
import { http } from "config/http";
import { openMongoConnection } from "config/mongo";
import { getRepositories } from "repositories";
import { Services, getServices } from "services";

export let services: Services;
async function start() {
  const logger = configVars.baseLogger;
  logger.info("Iniciando API");

  // add infrastructure
  await Promise.all([
    openMongoConnection(configVars.mongo.uri, configVars.baseLogger),
    openBuildConnection(
      configVars.build.apiKey,
      configVars.build.secret,
      configVars.baseLogger
    ),
  ]);

  // repositories
  logger.info("Iniciando repositorios");
  const repositories = getRepositories(configVars.baseLogger, configVars);

  // services
  logger.info("Iniciando servicios");
  services = getServices(configVars.baseLogger, repositories);

  http(configVars);
}

start();
