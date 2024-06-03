import { Request, Response } from "express";
import { UserResponce } from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";
import { encrypt } from "../utils/helpers";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { error } from "console";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;

      // Encrypt the password
      const encryptedPassword = await encrypt.encryptpass(password);

      // Get the user repository
      const userRepository = AppDataSource.getRepository(User);

      // Check if a user with the same email already exists
      const existingUser = await userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email is already exists" });
      } else {
        // Create a new user entity and set its properties
        const user = new User();
        user.username = username;
        user.email = email;
        user.role = role;
        user.password = encryptedPassword;

        // Save the user to the database
        await userRepository.save(user);

        // Generate a token for the new user
        const token = encrypt.generateToken({ id: user.id });

        // Prepare the response data
        const userDataSent = {
          username: user.username,
          email: user.email,
          role: user.role,
        };

        // res.cookie("token", token, {
        //   path: "/", // Cookie is accessible from all paths
        //   expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        //   secure: true, // Cookie will only be sent over HTTPS
        //   httpOnly: true, // Cookie cannot be accessed via client-side scripts
        // });
        // Return success response with token and user data
        return res.status(201).json({
          message: "User created successfully",
          token,
          user: userDataSent,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      return res.status(400).json({ message: "Invalid user data" });
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
