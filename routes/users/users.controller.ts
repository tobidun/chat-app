import express from "express";
import { token } from "../../middlewares/token";
import { userService } from "./users.service";

export const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res, next) => {
  try {
    const result = await userService.signup(req.body);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

UserRouter.post("/login", async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.send({ success: true, result });
  } catch (e) {
    throw e;
  }
});

UserRouter.put(
  "/reset-password/:id",
  token.decodeAccessToken,
  async (req: any, res, next) => {
    try {
      const result = await userService.resetUserPassword(
        req.params.email,
        req.body
      );
      res.send({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
);
