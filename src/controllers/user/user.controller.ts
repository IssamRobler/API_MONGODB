import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../../common/jwt.helper/jwt.helper";
import { JWTUserInfo } from "../../entities/jwt.sign.entities";
import { UserService } from "../../service/user/user.service";

const userRouter = express.Router();

userRouter.get(
  "/profile",
  authenticateToken,
  async (
    req: Request & { user: JWTUserInfo },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const service = new UserService();
      const profile = await service.getProfile(req.user.userId);
      res.status(200).send(profile);
    } catch (err) {
      next(err);
    }
  }
);

export default userRouter;
