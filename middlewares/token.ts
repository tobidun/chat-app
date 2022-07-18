import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../routes/users/users.model";

export const secretKey = process.env.JWT_SECRET || "secretishere";
class Token {
  async decodeAccessToken(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      if (!token) throw new Error("Unauthorized user");
      let decodedToken = jwt.verify(token.split(" ")[1], secretKey) as any;
      const { userId } = decodedToken;
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error("User not found!");
      }
      req.userId = userId;
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const token = new Token();
