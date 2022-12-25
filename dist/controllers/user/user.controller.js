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
const jwt_helper_1 = require("../../common/jwt.helper/jwt.helper");
const user_service_1 = require("../../service/user/user.service");
const userRouter = express.Router();
userRouter.get("/profile", jwt_helper_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = new user_service_1.UserService();
        const profile = yield service.getProfile(req.user.userId);
        res.status(200).send(profile);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = userRouter;
