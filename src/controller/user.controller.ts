import { Request, Response } from "express";
import { UserResponce } from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";
import { encrypt } from "../utils/helpers";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;
      // Encrypt the password
      const encryptedPassword = await encrypt.encryptpass(password);

      // Create a new user entity
      const user = new User();
      user.username = username;
      user.email = email;
      user.role = role;
      user.password = encryptedPassword;

      // Save the user to the database
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(user);

      // Generate a token
      const token = encrypt.generateToken({ id: user.id });

      // Prepare the user data to be sent in the response
      const userDataSent = new UserResponce();
      userDataSent.username = user.username;
      userDataSent.email = user.email;
      userDataSent.role = user.role;

      // Return success response with token and user data
      return res.status(200).json({
        message: "User created successfully",
        token,
        user: userDataSent,
      });
    } catch (error) {
      // Handle any errors that occur during signup process
      console.error("Error occurred during signup:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "User deleted successfully" });
  }
}
