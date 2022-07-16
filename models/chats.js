const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
