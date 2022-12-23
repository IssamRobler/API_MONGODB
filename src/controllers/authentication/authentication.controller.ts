import * as express from "express";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { Request } from "express";
import {
  UserSignUpInfo,
  userSignUpInfoschema,
} from "../../entities/user.signup.entities";
import validate from "../../entities/validate.entities";
import { checkSchema } from "express-validator";

const authenticationRouter = express.Router();

authenticationRouter.post(
  "/createAccount",
  ...validate(userSignUpInfoschema),
  async (req: Request<UserSignUpInfo>, res, next) => {
    try {
      const service = new AuthenticationService();
      const created = await service.createAccount(req.body);
      res.status(200).send(created);
    } catch (err) {
      next(err);
    }
  }
);

authenticationRouter.post("/login", (req, res) => {});

export default authenticationRouter;
