import { ReactionModel } from "./reactions.model";

class ReactionService {
  async reactToMessage(userId: string, reaction: string, messageId: string) {
    try {
      const is_react = await ReactionModel.findOne({
        user: userId,
        message: messageId,
      });
      if (is_react) throw new Error("You have already reacted to this message");
      const react = await ReactionModel.create({
        user: userId,
        message: messageId,
        reaction: reaction,
      });
      return react;
    } catch (e) {
      throw e;
    }
  }
}

export const reactionService = new ReactionService();
