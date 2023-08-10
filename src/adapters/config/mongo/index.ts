import { ILogger } from "logger/Logger";
import mongoose from "mongoose";

export async function openMongoConnection(
  uri: string,
  logger: ILogger
): Promise<void> {
  try {
    await mongoose.connect(uri);
    logger.info("Conexion a mongo exitosa");
  } catch (err) {
    logger.error("Fallo al conectar a mongo", err);
    throw err;
  }
}
