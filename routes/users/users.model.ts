import { Document, model, Model, Schema } from "mongoose";

export interface ILoginDetails {
  email: string;
  password: string;
}
export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },
  },
  { toObject: { getters: true, virtuals: true } }
);

export const UserModel: Model<IUser> = model<IUser>("User", UserSchema);
