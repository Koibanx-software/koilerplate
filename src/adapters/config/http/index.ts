//DONT REMOVE KOIGEN PURPOSES:  IMPORT-CONTROLLER
import "./EndpointFactory";
import { routing } from "adapters/routes";
import { IConfig, configVars } from "config";
import { Documentation, createConfig } from "express-zod-api";
import { createServer } from "express-zod-api";
import fs from "fs";
import yaml from "js-yaml";

export const HTTPConfig = createConfig({
  server: {
    upload: true,
    listen: configVars.http.port, // port or socket
  },
  tags: {
    coins: "Control de tipos de monedas",
    users: "Control de usuarios",
    auth: "Control de autenticacion",
    files: "Control de archivos",
    stores: "Control de tiendas",
    order: "Control de ordenes",
    notifications: "Control de notificaciones",
    webhook: "Control de webhooks",
  },
  cors: ({ defaultHeaders, request, endpoint, logger }) => ({
    ...defaultHeaders,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  }),
  logger: {
    level: "debug",
    color: true,
  },
});

export function http(configVars: IConfig) {
  const logger = configVars.baseLogger.child({ infrastructure: "HTTP" });
  logger.info("Iniciando http");

  const yamlString = new Documentation({
    routing, // the same routing and HTTPConfig that you use to start the server
    config: HTTPConfig,
    version: "1.0.0",
    title: "Crypto checkout",
    serverUrl: "https://crypto-checkout-v2.dev.build.koibanx.com/v1",
    composition: "inline", // optional, or "components" for keeping schemas in a separate dedicated section using refs
  }).getSpecAsYaml();

  fs.writeFileSync("openapi.yaml", yaml.dump(yamlString));

  createServer(HTTPConfig, routing);
}
