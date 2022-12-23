"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (schema) => {
    return [
        (0, express_validator_1.checkSchema)(schema),
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            next();
        },
    ];
};
exports.default = validate;
