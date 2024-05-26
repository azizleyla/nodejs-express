import { Request, Response } from "express";
import { encrypt } from "../utils/helpers";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class AuthController {
  static async login(req: any, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(500)
          .json({ message: " email and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      const isPasswordValid = encrypt.comparepassword(
        user.password,
        password,
      );
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = encrypt.generateToken({ id: user.id });

      return res
        .status(200)
        .json({ message: "Login successful", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // static async getProfile(req: any, res: any) {
  //   console.log(req);
  //   if (req.session.user) {
  //     // Access user data from session
  //     const user = req.session.user;
  //     res.json(user);
  //   } else {
  //     res.status(401).json({ message: "Unauthorized" });
  //   }
  // }
  static async getProfile(req: Request, res: Response) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}