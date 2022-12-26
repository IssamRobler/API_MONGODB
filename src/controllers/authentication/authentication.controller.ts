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

/**
/**
 * @swagger
 * /auth/createAccount:
 *   post:
 *     description: Create Account for user
 *     tags: 
 *        - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *     responses:
 *       200:
 *         description: A single person
 */
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

/**
/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login user
 *     tags: 
 *        - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: A single person
 */
authenticationRouter.post(
  "/login",
  ...validate(userLoginInfoschema),
  async (
    req: Request<UserLoginInfo>,
    res: Response,
    next: express.NextFunction
  ) => {
    console.log(req)
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
