import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../routes/users/users.model";

export const secretKey = process.env.JWT_SECRET || "secretishere";
export const secretKeyForRefreshToken =
  process.env.JWT_REFRESH_TOKEN || "secretforrefreshishere";
class Token {
  async decodeAccessToken(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      if (!token) throw new Error("Unauthorized user");
      let decodedToken = jwt.verify(token.split(" ")[1], secretKey) as any;
      const { user } = decodedToken;
      const newUser = await UserModel.findById(user);
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
