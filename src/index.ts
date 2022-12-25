import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import authenticationRouter from "./controllers/authentication/authentication.controller";
import {
  critialErrorMiddleware,
  errorMiddleware,
} from "./common/middleware/error.middleware";
import userRouter from "./controllers/user/user.controller";
import { db } from "./mongodb/MongoDBConnection";
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
app.use("/user", userRouter);
app.use(errorMiddleware);
app.use(critialErrorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`API RUNNNING AT PORT ${PORT} in ${process.env.NODE_ENV}`);
});

process.on("SIGINT", async function () {
  console.info("SIGINT signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed. Cleanup db");
    // boolean means [force], see in mongoose do
  });
  await db.close()
  process.exit(0);
});
export default server;
