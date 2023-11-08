import { services } from "app";
import { createConfig, createServer } from "express-zod-api";
import { routes } from "routes/index";
import { Services } from "services/index";

export const createHTTP = (services: Services) => {
  const config = createConfig({
    server: {
      listen: 8090, // port, UNIX socket or options
    },
    cors: true,
    logger: { level: "debug", color: true },
  });
  createServer(config, routes(services));
};
