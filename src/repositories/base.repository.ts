import { InsertOneResult, Collection } from "mongodb";
import { db } from "../mongodb/MongoDBConnection";

export class BaseRepository<T> {
  public readonly collection: Collection;

  constructor(collectionName: string) {
    this.collection = db.getCollection(collectionName);
  }
  async create(item: T): Promise<boolean> {
    try {
      const result: InsertOneResult = await this.collection.insertOne(item, {
        writeConcern: { j: true },
      });
      // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
      // and we convert to boolean result (0 false, 1 true)
      return result.acknowledged;
    } catch (err) {
      throw err;
    }
  }
  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
