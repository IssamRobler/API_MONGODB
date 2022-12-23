"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authentication_controller_1 = require("./controllers/authentication/authentication.controller");
dotenv.config();
const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
const PORT = process.env.API_PORT;
app.get("/", (req, res) => {
    res.send("Hi issam");
});
app.use("/auth", authentication_controller_1.default);
app.listen(PORT, () => {
    console.log(`API RUNNNING AT PORT ${PORT} in ${process.env.NODE_ENV}`);
});
