import { Document, model, Model, Schema, Types } from "mongoose";
import { IChat } from "../chats/chats.model";
import { IUser } from "../users/users.model";

export enum ReactionTypeEnum {
  LIKE = "like",
  LOVE = "love",
  ANGRY = "angry",
}
export interface IReaction extends Document {
  user: Types.ObjectId | IUser;
  message: Types.ObjectId | IChat;
  reaction: ReactionTypeEnum;
  created_at: Date;
}

const ReactionSchema = new Schema<IReaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  reaction: {
    type: String,
    enum: Object.values(ReactionTypeEnum),
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

export const ReactionModel: Model<IReaction> = model<IReaction>(
  "Reaction",
  ReactionSchema
);
