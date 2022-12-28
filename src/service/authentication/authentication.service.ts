import { ErrorType } from "../../common/error.type/error.type";
import { HTTPStatus } from "../../common/httpstatus/httpstatus.common";
import { generateAccessToken } from "../../common/jwt.helper/jwt.helper";
import {
  checkPassword,
  hashPassword,
} from "../../common/password.management/password.management.common";
import { ServiceError } from "../../common/service.error/service.error.common";
import { ServiceResponse } from "../../common/service.response/service.response.common";
import { JWTUserInfo } from "../../entities/jwt.sign.entities";
import { ROLE } from "../../entities/role.entitites";
import { UserLoginInfo } from "../../entities/user.login.entity";
import { UserSignUpInfo } from "../../entities/user.signup.entities";
import { User } from "../../models/user.model";
import { UserRepository } from "../../repositories/user/user.repository";
import { v4 as uuidv4 } from "uuid";

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
          userId: uuidv4(),
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

  public async login(loginInfo: UserLoginInfo) {
    try {
      const repo: UserRepository = new UserRepository();
      const user: User = await repo.findUserByEmail(loginInfo.email);
      if (!user) {
        throw new ServiceError("Invalid email or password").setHttpStatus(401);
      }
      const validPassword: boolean = await checkPassword(
        loginInfo.password,
        user.hashed_password
      );

      if (!validPassword) {
        throw new ServiceError("Invalid email or password").setHttpStatus(401);
      }
      const jwtUserInfo: JWTUserInfo = {
        userId: user.userId,
        role: user.role,
      };
      return generateAccessToken(jwtUserInfo);
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
