import * as express from "express";
import { DoctorController } from "../controller/doctor.controller";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";

const Router = express.Router();

Router.get(
  "/",
  authentification,
  authorization(["admin"]),
  DoctorController.getDoctors,
);

export { Router as doctorRouter };
