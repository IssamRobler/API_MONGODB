import * as express from "express";
import * as dotenv from "dotenv";
import { connection, MongoDBConnection } from "./mongodb/MongoDBConnection";
dotenv.config();

const app = express();
const PORT = process.env.API_PORT;

app.get("/", (req, res) => {
  res.send("Hi issam");
});

app.listen(PORT, () => {
  console.log(`API RUNNNING AT PORT ${PORT} in ${process.env.NODE_ENV}`);
});
