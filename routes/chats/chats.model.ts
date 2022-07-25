import { Document, model, Model, Schema, Types } from "mongoose";
import { IUser } from "../users/users.model";

export interface IChat extends Document {
  message: string;
  user: Types.ObjectId | IUser | string;
  is_deleted: boolean;
}

export const ChatSchema = new Schema(
  {
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { toObject: { getters: true, virtuals: true } }
);

export const ChatModel: Model<IChat> = model<IChat>("Chat", ChatSchema);
