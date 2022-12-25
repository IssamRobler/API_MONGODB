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
exports.UserRepository = void 0;
const httpstatus_common_1 = require("../../common/httpstatus/httpstatus.common");
const service_error_common_1 = require("../../common/service.error/service.error.common");
const base_repository_1 = require("../base.repository");
const collection_names_1 = require("../collection.names");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(collection_names_1.COLLECTION.User);
    }
    checkUserExistByEmail(userEmail) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield _super.findOne.call(this, { email: userEmail });
                return !!userFound;
            }
            catch (err) {
                throw new service_error_common_1.ServiceError("Something has gone wrong with the server.")
                    .setAdditionalErrorMessage(err)
                    .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
            }
        });
    }
    findUserByEmail(userEmail) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _super.findOne.call(this, { email: userEmail });
            }
            catch (err) {
                throw new service_error_common_1.ServiceError("Something has gone wrong with the server.")
                    .setAdditionalErrorMessage(err)
                    .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
            }
        });
    }
    findUserById(userId) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _super.findOne.call(this, { userId: userId });
            }
            catch (err) {
                throw new service_error_common_1.ServiceError("Something has gone wrong with the server.")
                    .setAdditionalErrorMessage(err)
                    .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
            }
        });
    }
}
exports.UserRepository = UserRepository;
