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
const express = require("express");
const authentication_service_1 = require("../../service/authentication/authentication.service");
const authenticationRouter = express.Router();
authenticationRouter.post("/createAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = new authentication_service_1.AuthenticationService();
        const created = yield service.createAccount(req.body);
        res.status(200).send({ usercreated: created });
    }
    catch (err) {
        res.status(403).send({ message: err.message });
    }
}));
authenticationRouter.post("/login", (req, res) => { });
exports.default = authenticationRouter;
