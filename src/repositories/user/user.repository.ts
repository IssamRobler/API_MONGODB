import { WithId, Document } from "mongodb";
import { User } from "../../models/user.model";
import { BaseRepository } from "../base.repository";
import { COLLECTION } from "../collection.names";

export class UserRepository extends BaseRepository<User> {
  public constructor() {
    super(COLLECTION.User);
  }
  public async checkUserExistByEmail(userEmail: string): Promise<boolean> {
    try {
      const userFound: WithId<Document> = await this.collection.findOne({
        email: userEmail,
      });
      return !!userFound;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
