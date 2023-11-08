import { configVars } from "config";
import { openBuildConnection } from "config/build";
import { createHTTP } from "config/http";
import { openMongoConnection } from "config/mongo";
import moduleAlias from "module-alias";
import { getRepositories } from "repositories";
import { getServices, Services } from "services";

moduleAlias.addAliases({
  config: __dirname + "/config",
  entities: __dirname + "/entities",
  repositories: __dirname + "/repositories",
  routes: __dirname + "/routes",
  services: __dirname + "/services",
  utils: __dirname + "/utils",
});

export let services: Services;
async function start() {
  const logger = configVars.baseLogger;
  logger.info("Iniciando API");

  // add infrastructure
  // await Promise.all([
  //   openMongoConnection(configVars.mongo.uri, configVars.baseLogger),
  //   openBuildConnection(
  //     configVars.build.apiKey,
  //     configVars.build.secret,
  //     configVars.baseLogger,
  //   ),
  // ]);

  // repositories
  logger.info("Iniciando repositorios");
  const repositories = getRepositories(configVars.baseLogger, configVars);

  // services
  logger.info("Iniciando servicios");
  services = getServices(configVars.baseLogger, repositories);

  createHTTP(services);
}

start();
