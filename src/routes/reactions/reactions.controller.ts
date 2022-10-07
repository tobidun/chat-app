import express from "express";
import { token } from "../../../middlewares/token";
import { reactionService } from "./reactions.service";

export const ReactionRouter = express.Router();

ReactionRouter.post(
  "/",
  token.decodeAccessToken,
  async (req: any, res, next) => {
    try {
      const result = await reactionService.reactToMessage(
        req.userId,
        req.body.reaction,
        req.body.messageId
      );
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);
