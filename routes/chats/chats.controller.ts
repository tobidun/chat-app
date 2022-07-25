import express from "express";
import { token } from "../../middlewares/token";
import { chatService } from "./chats.service";

export const ChatRouter = express.Router();

ChatRouter.post("/", token.decodeAccessToken, async (req: any, res, next) => {
  try {
    const result = await chatService.create(req.body, req.userId);
    res.send({ success: true, result });
  } catch (e) {
    next(e);
  }
});

ChatRouter.get("/:id", token.decodeAccessToken, async (req: any, res, next) => {
  try {
    const result = await chatService.getChatById(req.params.id);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

ChatRouter.get("/", async (req: any, res, next) => {
  try {
    const result = await chatService.getAllChat();
    res.send(result);
  } catch (e) {
    next(e);
  }
});

ChatRouter.put("/:id", token.decodeAccessToken, async (req: any, res, next) => {
  try {
    const result = await chatService.editChat(
      req.params.id,
      req.body,
      req.userId
    );
    res.send({ success: true, result });
  } catch (e) {
    next(e);
  }
});

ChatRouter.delete(
  "/:id",
  token.decodeAccessToken,
  async (req: any, res, next) => {
    try {
      const result = await chatService.deleteChat(req.params.id, req.userId);
      res.send({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
);

ChatRouter.get(
  "/user/:userId",
  token.decodeAccessToken,
  async (req: any, res, next) => {
    try {
      const result = await chatService.findChatByUser(req.userId);
      res.send({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
);

ChatRouter.get(
  "/aggregate/:id",
  token.decodeAccessToken,
  async (req: any, res, next) => {
    try {
      const result = await chatService.getUserChatsCount(req.userId);
      res.send({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
);
