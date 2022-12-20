"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hi issam");
});
app.listen(PORT, () => {
    console.log(`API RUNNNING AT PORT ${PORT}`);
});
