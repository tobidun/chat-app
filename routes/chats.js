var express = require("express");
var ChatRouter = express.Router();
var ChatModel = require("../models/chats");
var Token = require("../middlewares/token");

ChatRouter.post("/", Token, async (req, res, next) => {
  try {
    const chat = await ChatModel.create({
      message: req.body.message,
      user: req.userId,
    });
    res.send({ success: true, chat });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

ChatRouter.get("/", Token, async (req, res, next) => {
  try {
    const chat = await ChatModel.find({ user: req.userId });
    res.send({ success: true, chat });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

ChatRouter.get("/:id", Token, async (req, res, next) => {
  try {
    const chat = await ChatModel.findById(req.params.id);
    res.send({ success: true, chat });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

ChatRouter.put("/:id", Token, async (req, res, next) => {
  try {
    const user = await ChatModel.findOne({
      user: req.userId,
      _id: req.params.id,
    });
    console.log(user);
    if (!user) throw new Error("Unauthorized User");
    const chat = await ChatModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ success: true, chat });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

ChatRouter.delete("/:id", Token, async (req, res, next) => {
  try {
    const user = await ChatModel.findOne({
      user: req.userId,
      _id: req.params.id,
    });
    if (!user) throw new Error("Unauthorized User");
    const chat = await ChatModel.findByIdAndDelete(req.params.id);
    res.send({ success: true, chat });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

module.exports = ChatRouter;
