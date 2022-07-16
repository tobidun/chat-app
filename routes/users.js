var express = require("express");
var UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/users");
const session = require("express-session");

UserRouter.post("/signup", async (req, res, next) => {
  try {
    const { email } = req.body;
    const is_email = await UserModel.findOne({ email: email });
    if (is_email) throw new Error("Email already Exist");
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.create({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashed,
    });
    const accessToken = jsonwebtoken.sign(
      { user: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.send({ success: true, data: user, accessToken: accessToken });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

UserRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("Invalid Credentials");
    const compared = await bcrypt.compare(password, user.password);
    if (!compared) throw new Error("Invalid Credentials");
    const accessToken = jsonwebtoken.sign(
      { user: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.send({ success: true, accessToken: accessToken });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

UserRouter.post("/logout", async (req, res, next) => {
  try {
    return res.send({ success: true, message: "You successfully logged out" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

module.exports = UserRouter;
