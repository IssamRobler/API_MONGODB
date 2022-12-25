"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginInfoschema = void 0;
exports.userLoginInfoschema = {
    email: {
        exists: {
            errorMessage: "You must supply an email.",
        },
    },
    password: {
        exists: {
            errorMessage: "You must supply an password.",
        },
    },
};
