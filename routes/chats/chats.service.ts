import { ChatModel } from "./chats.model";

class ChatService {
  async create(message: string, userId: string) {
    try {
      const chat = await ChatModel.create(message, userId);
      return chat;
    } catch (e) {
      throw e;
    }
  }
}

export const chatService = new ChatService();
