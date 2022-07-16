const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
const e = require("express");

const secretKey = process.env.JWT_SECRET || "secretishere";
const Token = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Authentication Error");
    const decodedToken = jwt.verify(token, secretKey);
    let { user } = decodedToken;
    if (user) {
      const newUser = await UserModel.findById(user);
      req.userId = newUser._id;
    }
    next();
  } catch {
    res.json({ message: e.message });
  }
};

module.exports = Token;
