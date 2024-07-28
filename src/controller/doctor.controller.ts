import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import path = require("path");
import AppError from "../../utils/appError";
import { Doctor } from "../entities/doctor.entity";
import {
  createDoctor,
  deleteDoctor,
  findAll,
  getDoctor,
  updateDoctor,
} from "../services/doctor.service";

export const getDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const doctors = await findAll();

    return res.status(200).json({
      status: "success",
      data: {
        doctors,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const updateDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const doctorId = req.params.id;
    const doctor = await getDoctor(doctorId);

    if (!doctor) {
      return next(new AppError(404, "Doctor with that id not found"));
    }
    const updatedDoctor = await updateDoctor(doctorId, req.body);

    return res.status(201).json({
      status: "success",
      data: {
        doctor: updatedDoctor,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const deleteDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const doctorId = req.params.id;
    const doctor = await getDoctor(doctorId);
    if (!doctor) {
      return next(new AppError(404, "Doctor with that ID not found"));
    }
    await deleteDoctor(doctorId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
export const createDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let filePath = req.file?.path;
    const {
      firstname,
      lastname,
      gender,
      position,
      email,
      img_path,
      bio,
      created_at,
    } = req.body;
    if (filePath) {
      filePath = path.posix.normalize(filePath);
    }
    const results = await createDoctor(req.body);

    return res.status(201).json({
      status: "success",
      data: {
        doctor: results,
      },
    });
  } catch (error) {
    next(error);
  }
};
