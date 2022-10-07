import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../src/routes/users/users.model";

const secretKey = process.env.JWT_SECRET || "secretishere";
class Token {
  async generateAccessToken(userId: string) {
    try {
      return jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
    } catch (e) {
      throw e;
    }
  }

  async decodeAccessToken(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      if (!token) throw new Error("Unauthorized user");
      const decodedToken = jwt.verify(token.split(" ")[1], secretKey) as any;
      const { userId } = decodedToken;
      const newUser = await UserModel.findById(userId);
      if (!newUser) {
        throw new Error("User not found!");
      }
      req.userId = newUser.id;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const token = new Token();
