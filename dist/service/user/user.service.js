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
exports.UserService = void 0;
const service_error_common_1 = require("../../common/service.error/service.error.common");
const user_repository_1 = require("../../repositories/user/user.repository");
class UserService {
    constructor() { }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new user_repository_1.UserRepository();
                const profile = yield repo.findUserById(userId);
                const c = {
                    role: profile.role,
                    email: profile.email,
                    userId: profile.userId,
                };
                return c;
            }
            catch (err) {
                if (err instanceof service_error_common_1.ServiceError) {
                    throw err;
                }
                else {
                    throw new service_error_common_1.ServiceError("Something went wrong.")
                        .setHttpStatus(500)
                        .setAdditionalErrorMessage(err.message);
                }
            }
        });
    }
}
exports.UserService = UserService;
