import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Image } from "../entity/Image";

export class ImageController {
  static async addImages(req: Request, res: Response) {
    const { doctorId, name } = req.body;
    const { path } = req.file;
    const imageRepository = AppDataSource.getRepository(Image);
    try {
      const newImage = new Image();
      newImage.path = path;
      newImage.name = name;

      newImage.doctorId = doctorId;

      await imageRepository.save(newImage);

      return res.status(201).json({ message: "Image added successfully" });
    } catch (error) {
      console.error("Error adding image:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

// Apply multer middleware to the image upload route
