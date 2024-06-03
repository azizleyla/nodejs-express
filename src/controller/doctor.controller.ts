import { Request, Response } from "express";
import { UserResponce } from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";
import { encrypt } from "../utils/helpers";
import { Doctor } from "../entity/Doctor";
import { AppDataSource } from "../data-source";
import { error } from "console";

export class DoctorController {
  static async getDoctors(req: Request, res: Response) {
    try {
      const doctorRepository = AppDataSource.getRepository(Doctor);
      const doctorsWithImages = await doctorRepository.find({
        relations: ["images"],
      });
      const doctorsWithImageURLs = doctorsWithImages.map((doctor) => ({
        id: doctor.id,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        position: doctor.position,
        photo: doctor.images.map((image) => image.path).join(", "), // Concatenate image URLs into a single string
      }));

      return res.status(200).json(doctorsWithImageURLs);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  static async createDoctor(req: Request, res: Response) {
    const { firstname, lastname, position } = req.body;
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const newDoctor = new Doctor();
    newDoctor.firstname = firstname;
    newDoctor.lastname = lastname;
    newDoctor.position = position;
    try {
      const savedDoctor = await doctorRepository.save(newDoctor);
      return res.status(201).json({ id: savedDoctor.id });
    } catch (error) {
      console.error("Error creating doctor:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
