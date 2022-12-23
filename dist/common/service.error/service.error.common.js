"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = void 0;
class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
    setErrorType(errorType) {
        this.errorType = errorType;
        return this;
    }
    setAdditionalErrorMessage(additional) {
        this.additional = additional;
        return this;
    }
}
exports.ServiceError = ServiceError;
