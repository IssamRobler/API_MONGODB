"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpInfoschema = void 0;
exports.userSignUpInfoschema = {
    email: {
        exists: {
            errorMessage: "You must supply an email.",
        },
        IsEmail: {
            errorMessage: "Invalid email.",
            domain_specific_validation: true,
            require_tld: true
        },
    },
    password: {
        exists: {
            errorMessage: "You must supply an password.",
        },
    },
    retypepassword: {
        exists: {
            errorMessage: "You must retype your password.",
        },
    },
};
