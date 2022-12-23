import { ErrorType } from "../error.type/error.type";

export class ServiceError extends Error {
  public errorType: ErrorType;
  public additional: string;
  public message: string;
  public httpStatus:number
  constructor(message: string) {
    super(message);
    this.message = message
  }
  public setErrorType(errorType: ErrorType) {
    this.errorType = errorType;
    return this;
  }

  public setAdditionalErrorMessage(additional: string) {
    this.additional = additional;
    return this;
  }
}
