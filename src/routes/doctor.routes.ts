import * as express from "express";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";
import { DoctorController } from "../controller/doctor.controller";
import upload from "../middleware/image.middleware";

const Router = express.Router();

Router.get(
  "/",
  authentification,
  authorization(["admin"]),
  DoctorController.getDoctors,
);

Router.post(
  "/add-doctor",
  authentification,
  authorization(["admin"]),
  upload.single("img_path"),
  DoctorController.createDoctor,
);
Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  DoctorController.deleteDoctor,
);
Router.put(
  "/update/:id",
  authentification,
  authorization(["admin"]),
  upload.single("img_path"), // Add this line to handle form data

  DoctorController.updateDoctor,
);
export { Router as doctorRouter };
