import * as express from "express";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";
import upload from "../middleware/image.middleware";
import {
  createDoctorHandler,
  deleteDoctorHandler,
  getDoctors,
  updateDoctorHandler,
} from "../controller/doctor.controller";

const Router = express.Router();

Router.get("/", authentification, authorization(["admin"]), getDoctors);

Router.post(
  "/add-doctor",
  authentification,
  authorization(["admin"]),
  upload.single("img_path"),
  createDoctorHandler,
);
Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  deleteDoctorHandler,
);
Router.put(
  "/update/:id",
  authentification,
  authorization(["admin"]),
  upload.single("img_path"), // Add this line to handle form data

  updateDoctorHandler,
);
export { Router as doctorRouter };
