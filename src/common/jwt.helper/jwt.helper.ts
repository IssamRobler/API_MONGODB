import * as jwt from "jsonwebtoken";
import { JWTUserInfo } from "../../entities/jwt.sign.entities";

export function authenticateToken(req, res, next) {
  const authHeader: string = req.headers["authorization"];
  const token: string = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.API_SECRET as string,
    (err: any, user: JWTUserInfo) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
}

function generateAccessToken(userInfo: JWTUserInfo) {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "10s" });
}
