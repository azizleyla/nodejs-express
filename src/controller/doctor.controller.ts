import { Request, Response } from "express";
import { UserResponce } from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";
import { encrypt } from "../utils/helpers";
import { Doctor } from "../entity/Doctor";
import { AppDataSource } from "../data-source";
import { error } from "console";
import path = require("path");

export class DoctorController {
  static async getDoctors(req: Request, res: Response) {
    try {
      const doctorRepository = AppDataSource.getRepository(Doctor);
      const doctors = await doctorRepository.find(); // Fetch doctors from the database

      return res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  static async updateDoctor(req: Request, res: Response) {
    const { firstname, lastname, position, gender, email, bio } = req.body;

    const doctorRepository = AppDataSource.getRepository(Doctor);

    const doctorId = req.params.id;
    let filePath = req.file?.path;
    const doctor = await doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update the doctor's details if provided
    doctor.firstname = firstname;
    doctor.lastname = lastname;
    doctor.position = position;
    doctor.gender = gender;
    doctor.email = email;
    doctor.img_path = filePath;

    try {
      const savedDoctor = await doctorRepository.save(doctor);
      return res.status(201).json(savedDoctor);
    } catch (error) {
      console.error("Error creating doctor:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  static async deleteDoctor(req: Request, res: Response) {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    try {
      const doctorId = req.params.id;
      const doctor = await doctorRepository.find({
        where: { id: doctorId },
      });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      await doctorRepository.remove(doctor);
      return res
        .status(200)
        .json({ message: "Doctor deleted successfully" });
    } catch (err) {
      console.error("Error deleting doctor:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async createDoctor(req: Request, res: Response) {
    const doctorRepository = AppDataSource.getRepository(Doctor);

    const { firstname, lastname, position, gender, email, bio } = req.body;
    let filePath = req.file?.path;

    if (filePath) {
      filePath = path.posix.normalize(filePath);
    }
    const newDoctor = new Doctor();
    newDoctor.firstname = firstname;
    newDoctor.lastname = lastname;
    newDoctor.position = position;
    newDoctor.gender = gender;
    newDoctor.email = email;
    newDoctor.img_path = filePath;

    newDoctor.bio = bio;
    try {
      const savedDoctor = await doctorRepository.save(newDoctor);
      return res.status(201).json(savedDoctor);
    } catch (error) {
      console.error("Error creating doctor:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
