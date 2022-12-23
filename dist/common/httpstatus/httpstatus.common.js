"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPStatus = void 0;
var HTTPStatus;
(function (HTTPStatus) {
    HTTPStatus[HTTPStatus["SUCCESS"] = 200] = "SUCCESS";
    HTTPStatus[HTTPStatus["NOTFOUND"] = 404] = "NOTFOUND";
    HTTPStatus[HTTPStatus["SERVERERROR"] = 500] = "SERVERERROR";
    HTTPStatus[HTTPStatus["CREATED"] = 201] = "CREATED";
    HTTPStatus[HTTPStatus["BADREQUEST"] = 400] = "BADREQUEST";
    HTTPStatus[HTTPStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPStatus[HTTPStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HTTPStatus = exports.HTTPStatus || (exports.HTTPStatus = {}));
