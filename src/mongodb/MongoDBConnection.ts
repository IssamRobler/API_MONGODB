import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export class MongoDBConnection {
  private static instance: MongoDBConnection = null;
  private client: MongoClient;
  private constructor() {}

  public static getInstance() {
    console.log("Initialized");
    if (MongoDBConnection.instance === null) {
      MongoDBConnection.instance = new MongoDBConnection();
      MongoDBConnection.instance.init();
    }
    return MongoDBConnection.instance;
  }

  public async init() {
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
      await this.client.connect();
      console.log("Connected !");
    } catch (e) {
      console.error(e);
    }
  }
  
  public async cleanup() {
    try {
      await this.client.close();
    } catch (e) {
      console.error(e);
    }
  }
}

export const connection = MongoDBConnection.getInstance();
