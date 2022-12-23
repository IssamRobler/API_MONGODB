"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.critialErrorMiddleware = exports.errorMiddleware = void 0;
const service_error_common_1 = require("../service.error/service.error.common");
function errorMiddleware(error, request, response, next) {
    if (error instanceof service_error_common_1.ServiceError) {
        response.status(error.httpStatus).send(error);
    }
    else {
        next(error);
    }
}
exports.errorMiddleware = errorMiddleware;
function critialErrorMiddleware(error, request, response, next) {
    console.error(error.stack);
    response.status(500).send("Something went wrong");
}
exports.critialErrorMiddleware = critialErrorMiddleware;
