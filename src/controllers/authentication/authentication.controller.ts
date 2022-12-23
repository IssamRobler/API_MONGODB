import * as express from "express";
import { AuthenticationService } from "../../service/authentication/authentication.service";

const authenticationRouter = express.Router();

authenticationRouter.post("/createAccount", async (req, res) => {
  try {
    const service = new AuthenticationService();
    const created = await service.createAccount(req.body);
    res.status(200).send({ usercreated: created });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
});

authenticationRouter.post("/login", (req, res) => {});

export default authenticationRouter;
