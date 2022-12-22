"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const MongoDBConnection_1 = require("./mongodb/MongoDBConnection");
dotenv.config();
const app = express();
const PORT = process.env.API_PORT;
app.get("/", (req, res) => {
    res.send("Hi issam");
});
app.listen(PORT, () => {
    const c = MongoDBConnection_1.connection;
    console.log(`API RUNNNING AT PORT ${PORT} in ${process.env.NODE_ENV}`);
});
