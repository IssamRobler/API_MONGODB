import { ServiceError } from "../../common/service.error/service.error.common";
import { User, UserProfile } from "../../models/user.model";
import { UserRepository } from "../../repositories/user/user.repository";

export class UserService {
  constructor() {}
  public async getProfile(userId: string): Promise<UserProfile> {
    try {
      const repo: UserRepository = new UserRepository();
      const profile = await repo.findUserById(userId);
      const c: UserProfile = {
        role: profile.role,
        email: profile.email,
        userId: profile.userId,
      };
      return c;
    } catch (err) {
      if (err instanceof ServiceError) {
        throw err;
      } else {
        throw new ServiceError("Something went wrong.")
          .setHttpStatus(500)
          .setAdditionalErrorMessage(err.message);
      }
    }
  }
}
