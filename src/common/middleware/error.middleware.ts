import { ServiceError } from "../service.error/service.error.common";

function errorMiddleware(error: ServiceError, request: Request, response: Response, next: NextFunction) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      response
        .status(status)
        .send({
          status,
          message,
        })
}