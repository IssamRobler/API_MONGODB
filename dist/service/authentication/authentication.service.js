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
const error_type_1 = require("../../common/error.type/error.type");
const password_management_common_1 = require("../../common/password.management/password.management.common");
const service_error_common_1 = require("../../common/service.error/service.error.common");
const service_response_common_1 = require("../../common/service.response/service.response.common");
const role_entitites_1 = require("../../entities/role.entitites");
const user_repository_1 = require("../../repositories/user/user.repository");
class AuthenticationService {
    createAccount(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new user_repository_1.UserRepository();
                const userFound = yield userRepo.checkUserExistByEmail(userInfo.email);
                if (userFound) {
                    const error = new service_error_common_1.ServiceError("User with given email already exist.").setErrorType(error_type_1.ErrorType.USERALREADYEXIST);
                    return new service_response_common_1.ServiceResponse(null, false, error);
                }
                else {
                    const new_user = {
                        role: role_entitites_1.ROLE.USER,
                        email: userInfo.email,
                        hashed_password: yield (0, password_management_common_1.hashPassword)(userInfo.password),
                    };
                    const created = yield userRepo.create(new_user);
                    return new service_response_common_1.ServiceResponse({ created }, true, null);
                }
            }
            catch (err) {
                const error = new service_error_common_1.ServiceError("Something has gone wrong with the server.")
                    .setErrorType(error_type_1.ErrorType.SERVERERROR)
                    .setAdditionalErrorMessage(err);
                return new service_response_common_1.ServiceResponse(null, false, error);
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
