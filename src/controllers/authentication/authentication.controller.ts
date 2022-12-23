import * as express from "express";
import { AuthenticationService } from "../../service/authentication/authentication.service";

const authenticationRouter = express.Router();

authenticationRouter.post("/createAccount", async (req, res,next) => {
  try {
    const service = new AuthenticationService();
    const created = await service.createAccount(req.body);
    console.log(created)
    res.status(200).send(created);
  } catch (err) {
    next(err)
  }
});

authenticationRouter.post("/login", (req, res) => {});

export default authenticationRouter;
