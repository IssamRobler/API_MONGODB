"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = void 0;
class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.error_message = message;
    }
    setAdditionalErrorMessage(additional) {
        this.additional = additional;
        return this;
    }
    setHttpStatus(httpStatus) {
        this.httpStatus = httpStatus;
        return this;
    }
}
exports.ServiceError = ServiceError;
