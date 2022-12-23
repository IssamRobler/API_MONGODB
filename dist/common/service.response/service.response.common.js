"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor(data, isSuccesful, error = null) {
        this.data = data;
        this.isSuccesful = isSuccesful;
        this.error = error;
    }
}
exports.ServiceResponse = ServiceResponse;
