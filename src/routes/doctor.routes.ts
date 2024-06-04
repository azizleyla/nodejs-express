import * as express from "express";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";
import { DoctorController } from "../controller/doctor.controller";
import { upload } from "../middleware/image.middleware";

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
  upload.single("img_path"),
  authorization(["admin"]),
  DoctorController.createDoctor,
);

export { Router as doctorRouter };
