import { ErrorType } from "../error.type/error.type";
import { HTTPStatus } from "../httpstatus/httpstatus.common";

export class ServiceError extends Error {
  public additional: string;
  public error_message: string;
  public httpStatus: HTTPStatus;
  constructor(message: string) {
    super(message);
    this.error_message = message;
  }

  public setAdditionalErrorMessage(additional: string): ServiceError {
    this.additional = additional;
    return this;
  }
  public setHttpStatus(httpStatus: HTTPStatus): ServiceError {
    this.httpStatus = httpStatus;
    return this;
  }
}
