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
const user_signup_entities_1 = require("../../entities/user.signup.entities");
const validate_entities_1 = require("../../entities/validate.entities");
const authenticationRouter = express.Router();
authenticationRouter.post("/createAccount", ...(0, validate_entities_1.default)(user_signup_entities_1.userSignUpInfoschema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = new authentication_service_1.AuthenticationService();
        const created = yield service.createAccount(req.body);
        res.status(200).send(created);
    }
    catch (err) {
        next(err);
    }
}));
authenticationRouter.post("/login", (req, res) => { });
exports.default = authenticationRouter;
