import { ErrorType } from "../../common/error.type/error.type";
import { HTTPStatus } from "../../common/httpstatus/httpstatus.common";
import { hashPassword } from "../../common/password.management/password.management.common";
import { ServiceError } from "../../common/service.error/service.error.common";
import { ServiceResponse } from "../../common/service.response/service.response.common";
import { ROLE } from "../../entities/role.entitites";
import { UserSignUpInfo } from "../../entities/user.signup.entities";
import { User } from "../../models/user.model";
import { UserRepository } from "../../repositories/user/user.repository";

export class AuthenticationService {
  public async createAccount(userInfo: UserSignUpInfo) {
    try {
      const userRepo: UserRepository = new UserRepository();

      const userFound = await userRepo.checkUserExistByEmail(userInfo.email);

      if (userFound) {
        const error: ServiceError = new ServiceError(
          "User with given email already exist."
        ).setHttpStatus(HTTPStatus.BADREQUEST);
        throw error;
      } else {
        const new_user: User = {
          role: ROLE.USER,
          email: userInfo.email,
          hashed_password: await hashPassword(userInfo.password),
        };

        const created = await userRepo.create(new_user);

        return new ServiceResponse({ created });
      }
    } catch (err) {
      if (err instanceof ServiceError) {
        throw err;
      } else {
        throw new ServiceError("Something has gone wrong.")
          .setAdditionalErrorMessage(err.message)
          .setHttpStatus(HTTPStatus.SERVERERROR);
      }
    }
  }
}
