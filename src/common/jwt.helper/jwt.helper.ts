import * as jwt from "jsonwebtoken";
import { JWTUserInfo } from "../../entities/jwt.sign.entities";
import { HTTPStatus } from "../httpstatus/httpstatus.common";
import { ServiceError } from "../service.error/service.error.common";

export function authenticateToken(req, res, next) {
  const authHeader: string = req.headers["authorization"];
  const token: string = authHeader && authHeader.split(" ")[1];

  if (token == null)  {
    const error: ServiceError = new ServiceError(
      "Must supply valid token"
    ).setHttpStatus(HTTPStatus.UNAUTHORIZED);
    res.status(error.httpStatus).send(error as ServiceError);
  }

  jwt.verify(
    token,
    process.env.API_SECRET as string,
    (err: any, user: JWTUserInfo) => {
      if (err) {
        const error: ServiceError = new ServiceError(
          "Invalid or expired token."
        ).setHttpStatus(HTTPStatus.FORBIDDEN);
        res.status(error.httpStatus).send(error as ServiceError);
      } else {
        req.user = user;
        next();
      }
    }
  );
}

export function generateAccessToken(userInfo: JWTUserInfo) {
  return jwt.sign(userInfo, process.env.API_SECRET, {
    expiresIn: process.env.API_TOKEN_EXPIRE_TIME,
  });
}
