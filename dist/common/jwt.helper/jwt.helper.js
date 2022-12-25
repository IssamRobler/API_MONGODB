"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.authenticateToken = void 0;
const jwt = require("jsonwebtoken");
const httpstatus_common_1 = require("../httpstatus/httpstatus.common");
const service_error_common_1 = require("../service.error/service.error.common");
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
        if (err) {
            const error = new service_error_common_1.ServiceError("Invalid or expired token.").setHttpStatus(httpstatus_common_1.HTTPStatus.FORBIDDEN);
            res.status(error.httpStatus).send(error);
        }
        else {
            req.user = user;
            next();
        }
    });
}
exports.authenticateToken = authenticateToken;
function generateAccessToken(userInfo) {
    return jwt.sign(userInfo, process.env.API_SECRET, {
        expiresIn: process.env.API_TOKEN_EXPIRE_TIME,
    });
}
exports.generateAccessToken = generateAccessToken;
