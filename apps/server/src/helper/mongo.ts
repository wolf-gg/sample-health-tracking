import { MongoClient, Db } from "mongodb";
import "dotenv/config";
import { logError } from "@repo/logger";

const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

let db: Db | null = null;

async function getDb(): Promise<Db> {
  if (dbUrl === undefined || dbName === undefined) {
    throw new Error(
      "DB_URL and DB_NAME are not defined in the environment variables.",
    );
  }

  if (db) {
    return db;
  }

  try {
    const client = await MongoClient.connect(dbUrl);
    db = client.db(dbName);
    return db;
  } catch (error) {
    logError("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default getDb;
