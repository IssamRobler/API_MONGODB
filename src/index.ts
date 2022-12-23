import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import authenticationRouter from "./controllers/authentication/authentication.controller";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const PORT = process.env.API_PORT;

app.get("/", (req, res) => {
  res.send("Hi issam");
});

app.use("/auth", authenticationRouter);

app.listen(PORT, () => {
  console.log(`API RUNNNING AT PORT ${PORT} in ${process.env.NODE_ENV}`);
});
