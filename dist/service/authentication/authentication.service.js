"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const httpstatus_common_1 = require("../../common/httpstatus/httpstatus.common");
const jwt_helper_1 = require("../../common/jwt.helper/jwt.helper");
const password_management_common_1 = require("../../common/password.management/password.management.common");
const service_error_common_1 = require("../../common/service.error/service.error.common");
const service_response_common_1 = require("../../common/service.response/service.response.common");
const role_entitites_1 = require("../../entities/role.entitites");
const user_repository_1 = require("../../repositories/user/user.repository");
const uuid_1 = require("uuid");
class AuthenticationService {
    createAccount(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new user_repository_1.UserRepository();
                const userFound = yield userRepo.checkUserExistByEmail(userInfo.email);
                if (userFound) {
                    const error = new service_error_common_1.ServiceError("User with given email already exist.").setHttpStatus(httpstatus_common_1.HTTPStatus.BADREQUEST);
                    throw error;
                }
                else {
                    const new_user = {
                        role: role_entitites_1.ROLE.USER,
                        userId: (0, uuid_1.v4)(),
                        email: userInfo.email,
                        hashed_password: yield (0, password_management_common_1.hashPassword)(userInfo.password),
                    };
                    const created = yield userRepo.create(new_user);
                    return new service_response_common_1.ServiceResponse({ created });
                }
            }
            catch (err) {
                if (err instanceof service_error_common_1.ServiceError) {
                    throw err;
                }
                else {
                    throw new service_error_common_1.ServiceError("Something has gone wrong.")
                        .setAdditionalErrorMessage(err.message)
                        .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
                }
            }
        });
    }
    login(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new user_repository_1.UserRepository();
                const user = yield repo.findUserByEmail(loginInfo.email);
                if (!user) {
                    throw new service_error_common_1.ServiceError("Invalid email or password").setHttpStatus(401);
                }
                const validPassword = yield (0, password_management_common_1.checkPassword)(loginInfo.password, user.hashed_password);
                if (!validPassword) {
                    throw new service_error_common_1.ServiceError("Invalid email or password").setHttpStatus(401);
                }
                const jwtUserInfo = {
                    userId: user.userId,
                    role: user.role,
                };
                return (0, jwt_helper_1.generateAccessToken)(jwtUserInfo);
            }
            catch (err) {
                if (err instanceof service_error_common_1.ServiceError) {
                    throw err;
                }
                else {
                    throw new service_error_common_1.ServiceError("Something has gone wrong.")
                        .setAdditionalErrorMessage(err.message)
                        .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
                }
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
