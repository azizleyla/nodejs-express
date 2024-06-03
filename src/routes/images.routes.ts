import * as express from "express";
import { AuthController } from "../controller/auth.controller";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";
import { ImageController } from "../controller/images.controller";
import { upload } from "../middleware/image.middleware";

const Router = express.Router();

Router.post(
  "/upload",
  authentification, // Authentication middleware
  authorization(["admin"]), // Authorization middleware
  upload.single("path"),
  async (req, res) => {
    try {
      // Handle image upload logic here
      // You can call ImageController.addImages here if needed
      // For example:
      await ImageController.addImages(req, res);
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export { Router as imageRouter };
