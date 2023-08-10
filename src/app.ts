import { openBuildConnection } from "adapters/config/build";
import { http } from "adapters/config/http";
import { openMongoConnection } from "adapters/config/mongo";
import { getRepositories } from "adapters/repositories";
import { configVars } from "config";
import { Services, getServices } from "core/services";

export let services: Services;
async function start() {
  const logger = configVars.baseLogger;
  logger.info("Iniciando API");

  // infrastructure
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
