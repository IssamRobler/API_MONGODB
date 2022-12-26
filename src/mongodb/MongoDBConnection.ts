import { Collection, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export class MongoDBConnection {
  private static instance: MongoDBConnection = null;
  private client: MongoClient;
  private isConnected: boolean = false;
  private constructor() {}

  public static getInstance(): MongoDBConnection {
    console.log("Initialized");
    if (MongoDBConnection.instance === null) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async init(): Promise<void> {
    dotenv.config();

    /// Important to trim env variables initalized with package.json calls. weird bug.
    try {
      if (process.env.NODE_ENV.trim() === "development") {
        console.log("Connecting to dev db...");
        this.client = new MongoClient(process.env.API_MONGODB_TEST, {
          minPoolSize: 100,
        });
      } else {
        console.log("Connecting to prod db...");
        this.client = new MongoClient(process.env.API_MONGODB_PROD, {
          minPoolSize: 100,
        });
      }
      await this.connect();
    } catch (e) {
      console.error(e);
    }
  }

  public async connect(): Promise<boolean> {
    if (this.isConnected) {
      return true;
    }
    try {
      await this.client.connect();
      console.log("Connected !");
      this.isConnected = true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  public async close(): Promise<boolean> {
    if (!this.isConnected) {
      return true;
    }
    try {
      await this.client.close();
      console.log("closed");
      this.isConnected = false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public getCollection(collectionName: string): Collection {
    return this.client.db().collection(collectionName);
  }

  public async clearDatabase(): Promise<boolean> {
    try {
      const cleared: boolean = await this.client.db().dropDatabase();
      return cleared;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export const db: MongoDBConnection = MongoDBConnection.getInstance();
