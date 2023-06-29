import { ILogger } from "config/logger";
import mongoose from "mongoose";
import * as mongoDB from "mongodb";
import { User } from "core/entities/User";

export const collections: { users?: mongoDB.Collection<User> } = {};

export async function connectToDatabase(uri: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

  await client.connect();

  const db: mongoDB.Db = client.db("hola");

  collections.users = db.collection<User>("users");

  console.log(`Successfully connected to database: ${db.databaseName}`);
}

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
