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
exports.db = exports.MongoDBConnection = void 0;
const mongodb_1 = require("mongodb");
const dotenv = require("dotenv");
class MongoDBConnection {
    constructor() { }
    static getInstance() {
        console.log("Initialized");
        if (MongoDBConnection.instance === null) {
            MongoDBConnection.instance = new MongoDBConnection();
            MongoDBConnection.instance.init();
        }
        return MongoDBConnection.instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            dotenv.config();
            /// Important to trim env variables initalized with package.json calls. weird bug.
            try {
                if (process.env.NODE_ENV.trim() === "development") {
                    console.log("Connecting to dev db...");
                    this.client = new mongodb_1.MongoClient(process.env.API_MONGODB_TEST, {
                        minPoolSize: 100,
                    });
                }
                else {
                    console.log("Connecting to prod db...");
                    this.client = new mongodb_1.MongoClient(process.env.API_MONGODB_PROD, {
                        minPoolSize: 100,
                    });
                }
                yield this.client.connect();
                console.log("Connected !");
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.close();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getCollection(collecltionName) {
        return this.client.db().collection(collecltionName);
    }
}
exports.MongoDBConnection = MongoDBConnection;
MongoDBConnection.instance = null;
exports.db = MongoDBConnection.getInstance();
