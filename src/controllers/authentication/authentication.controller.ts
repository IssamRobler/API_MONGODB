import * as express from "express";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { Request, Response } from "express";
import {
  UserSignUpInfo,
  userSignUpInfoschema,
} from "../../entities/user.signup.entities";
import validate from "../../entities/validate.entities";
import { checkSchema } from "express-validator";
import {
  UserLoginInfo,
  userLoginInfoschema,
} from "../../entities/user.login.entity";

const authenticationRouter = express.Router();

authenticationRouter.post(
  "/createAccount",
  ...validate(userSignUpInfoschema),
  async (
    req: Request<UserSignUpInfo>,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      const service = new AuthenticationService();
      const created = await service.createAccount(req.body);
      res.status(200).send(created);
    } catch (err) {
      next(err);
    }
  }
);

authenticationRouter.post(
  "/login",
  ...validate(userLoginInfoschema),
  async (
    req: Request<UserLoginInfo>,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      const service = new AuthenticationService();
      const token = await service.login(req.body);
      res.status(200).send({ token: token });
    } catch (err) {
      next(err);
    }
  }
);

export default authenticationRouter;
