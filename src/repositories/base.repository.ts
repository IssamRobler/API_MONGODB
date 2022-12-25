import { InsertOneResult, Collection } from "mongodb";
import { ErrorType } from "../common/error.type/error.type";
import { HTTPStatus } from "../common/httpstatus/httpstatus.common";
import { ServiceError } from "../common/service.error/service.error.common";
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
      throw new ServiceError("Something has gone wrong with the server.")
        .setAdditionalErrorMessage(err)
        .setHttpStatus(HTTPStatus.SERVERERROR);
    }
  }
  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(query: Partial<T>): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(query: Partial<T>): Promise<T> {
    try {
      const data: T = await this.collection.findOne<T>(query);
      return data;
    } catch (err) {
      throw new ServiceError("Something has gone wrong with the server.")
        .setAdditionalErrorMessage(err)
        .setHttpStatus(HTTPStatus.SERVERERROR);
    }
  }
}
