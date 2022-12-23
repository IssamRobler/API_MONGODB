import { NextFunction, Response, Request } from "express";
import { ServiceError } from "../service.error/service.error.common";

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ServiceError) {
    response.status(error.httpStatus).send(error as ServiceError);
  } else {
    next(error);
  }
}

export function critialErrorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error.stack);
  response.status(500).send("Something went wrong");
}
