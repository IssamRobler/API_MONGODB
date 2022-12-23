import { ServiceError } from "../service.error/service.error.common";

export class ServiceResponse {
  constructor(
    public data: any,
    public isSuccesful: boolean,
    public error: ServiceError = null
  ) {}
}
