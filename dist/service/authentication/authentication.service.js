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
const role_entitites_1 = require("../../entities/role.entitites");
const collection_names_1 = require("../../repositories/collection.names");
const user_repository_1 = require("../../repositories/user/user.repository");
class AuthenticationService {
    createAccount(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new user_repository_1.UserRepository(collection_names_1.COLLECTION.User);
                const userFound = yield userRepo.checkUserExistByEmail(userInfo.email);
                if (userFound) {
                    throw new Error("User already exist.");
                }
                else {
                    const new_user = {
                        role: role_entitites_1.ROLE.USER,
                        email: userInfo.email,
                        hashed_password: userInfo.password,
                    };
                    const created = userRepo.create(new_user);
                    return created;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
