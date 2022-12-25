import { WithId, Document } from "mongodb";
import { ErrorType } from "../../common/error.type/error.type";
import { HTTPStatus } from "../../common/httpstatus/httpstatus.common";
import { ServiceError } from "../../common/service.error/service.error.common";
import { User } from "../../models/user.model";
import { BaseRepository } from "../base.repository";
import { COLLECTION } from "../collection.names";

export class UserRepository extends BaseRepository<User> {
  public constructor() {
    super(COLLECTION.User);
  }
  public async checkUserExistByEmail(userEmail: string): Promise<boolean> {
    try {
      const userFound: User = await super.findOne({ email: userEmail });
      return !!userFound;
    } catch (err) {
      throw new ServiceError("Something has gone wrong with the server.")
        .setAdditionalErrorMessage(err)
        .setHttpStatus(HTTPStatus.SERVERERROR);
    }
  }

  public async findUserByEmail(userEmail: string): Promise<User> {
    try {
      return await super.findOne({ email: userEmail });
    } catch (err) {
      throw new ServiceError("Something has gone wrong with the server.")
        .setAdditionalErrorMessage(err)
        .setHttpStatus(HTTPStatus.SERVERERROR);
    }
  }

  public async findUserById(userId: string): Promise<User> {
    try {
      return await super.findOne({ userId: userId });
    } catch (err) {
      throw new ServiceError("Something has gone wrong with the server.")
        .setAdditionalErrorMessage(err)
        .setHttpStatus(HTTPStatus.SERVERERROR);
    }
  }
}
