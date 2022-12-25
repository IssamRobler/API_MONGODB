import { db } from "../../src/mongodb/MongoDBConnection";

export async function clearDatabase(): Promise<boolean> {
  return await db.clearDatabase();
}

export async function setupDatabase(): Promise<boolean> {
  return await db.connect();
}
