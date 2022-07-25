import { ChatModel, IChat } from "./chats.model";

class ChatService {
  async create(body: IChat, userId: string) {
    try {
      const { message } = body;
      const chat = await ChatModel.create({ message, user: userId });
      return { message: "Chat created successfully", id: chat._id };
    } catch (e) {
      throw e;
    }
  }

  async getChatById(id: string) {
    try {
      const chat = await ChatModel.findById(id);
      if (!chat) return null;
      const { _id, __v, ...others } = chat?.toObject();
      return others;
    } catch (e) {
      throw e;
    }
  }

  async getAllChat() {
    try {
      const chat = await ChatModel.find({ is_deleted: { $ne: true } });
      return chat.map((item) => {
        const { _id, __v, ...others } = item.toObject();
        return others;
      });
    } catch (err) {
      throw err;
    }
  }

  async editChat(id: string, body: IChat, userId: string) {
    try {
      const is_user = await ChatModel.findOne({ _id: id, user: userId });
      if (!is_user) throw { statusCode: 403, message: "Forbidden User" };
      const chat = await ChatModel.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });
      return { message: "Chat successfully deleted" };
    } catch (e) {
      throw e;
    }
  }

  async deleteChat(id: string, userId: string) {
    try {
      const is_user = await ChatModel.findOne({ _id: id, user: userId });
      if (!is_user) throw { statusCode: 403, message: "Forbidden User" };
      const chat = await ChatModel.findByIdAndUpdate(
        id,
        { user: userId, is_deleted: true },
        { new: true }
      );
      return { message: "Chat successfully deleted" };
    } catch (e) {
      throw e;
    }
  }

  async findChatByUser(userId: string) {
    try {
      const chat = await ChatModel.find({
        user: userId,
        is_deleted: { $ne: true },
      }).populate({
        path: "user",
        select: "username first_name last_name",
      });
      return chat.map((item) => {
        const { _id, __v, ...others } = item.toObject();
        delete others.user._id;
        return others;
      });
    } catch (e) {
      throw e;
    }
  }

  async getUserChatsCount(userId: string) {
    try {
      const chat = await ChatModel.count({ user: userId });
      return chat;
    } catch (e) {
      throw e;
    }
  }
}

export const chatService = new ChatService();
