import express from "express";
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
