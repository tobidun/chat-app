import bcrypt from "bcrypt";
import { token } from "../../../middlewares/token";
import { ILoginDetails, IUser, UserModel } from "./users.model";

class UserService {
  async signup(body: IUser) {
    try {
      const { email } = body;
      if (!email) throw new Error("Email is required");
      const is_email = await UserModel.findOne({ email: email });
      if (is_email) throw new Error("Email already Exist");
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      const user = await UserModel.create({ ...body });
      const accessToken = await token.generateAccessToken(user._id);
      return { success: true, accessToken: accessToken };
    } catch (e) {
      throw e;
    }
  }

  async login(body: ILoginDetails) {
    try {
      const { email } = body;
      const profile = await UserModel.findOne({ email });
      if (!profile) throw new Error("Invalid Credentials");
      else {
        const compared = await bcrypt.compare(body.password, profile.password);
        if (!compared) throw new Error("Invalid Credentials");
        const accessToken = await token.generateAccessToken(profile._id);
        return { accessToken };
      }
    } catch (e) {
      throw e;
    }
  }

  async resetUserPassword(email: IUser, body: IUser) {
    try {
      const is_user = await UserModel.findOne({ email: email });
      if (!is_user) throw new Error("Email does not exist");
      const user = await UserModel.findByIdAndUpdate({ email: email }, body, {
        new: true,
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export const userService = new UserService();
