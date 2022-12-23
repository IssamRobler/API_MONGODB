import { ErrorType } from "../../common/error.type/error.type";
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
        ).setErrorType(ErrorType.USERALREADYEXIST);
        return new ServiceResponse(null, false, error);
      } else {
        const new_user: User = {
          role: ROLE.USER,
          email: userInfo.email,
          hashed_password: userInfo.password,
        };

        const created = await userRepo.create(new_user);

        return new ServiceResponse({ created }, true, null);
      }
    } catch (err) {

      const error: ServiceError = new ServiceError(
        "Something has gone wrong with the server."
      )
        .setErrorType(ErrorType.SERVERERROR)
        .setAdditionalErrorMessage(err);

      return new ServiceResponse(null, false, error);
    }
  }
}
