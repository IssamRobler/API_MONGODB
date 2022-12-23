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
exports.BaseRepository = void 0;
const httpstatus_common_1 = require("../common/httpstatus/httpstatus.common");
const service_error_common_1 = require("../common/service.error/service.error.common");
const MongoDBConnection_1 = require("../mongodb/MongoDBConnection");
class BaseRepository {
    constructor(collectionName) {
        this.collection = MongoDBConnection_1.db.getCollection(collectionName);
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.collection.insertOne(item, {
                    writeConcern: { j: true },
                });
                // after the insert operations, we returns only ok property (that haves a 1 or 0 results)
                // and we convert to boolean result (0 false, 1 true)
                return result.acknowledged;
            }
            catch (err) {
                throw new service_error_common_1.ServiceError("Something has gone wrong with the server.")
                    .setAdditionalErrorMessage(err)
                    .setHttpStatus(httpstatus_common_1.HTTPStatus.SERVERERROR);
            }
        });
    }
    update(id, item) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    find(item) {
        throw new Error("Method not implemented.");
    }
    findOne(id) {
        throw new Error("Method not implemented.");
    }
}
exports.BaseRepository = BaseRepository;
