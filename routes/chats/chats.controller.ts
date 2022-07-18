import express from "express";
import { token } from "../../middlewares/token";
import { chatService } from "./chats.service";

export const ChatRouter = express.Router();

ChatRouter.post("/", token.decodeAccessToken, async (req: any, res, next) => {
  try {
    console.log(token);
    const result = await chatService.create(req.body.message, req.userId);
    res.send(result);
  } catch (e) {
    next(e);
  }
});
