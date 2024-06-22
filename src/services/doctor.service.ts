import { Doctor } from "../entities/doctor.entity";
import { AppDataSource } from "../data-source";

const doctorRepository = AppDataSource.getRepository(Doctor);

export const findAll = async () => {
  return doctorRepository.find();
};

export const getDoctor = async (doctorId: string) => {
  return await doctorRepository.findOneBy({ id: doctorId });
};
export const deleteDoctor = async (doctorId: string) => {
  await doctorRepository.delete(doctorId);
};

export const createDoctor = async (doctor: Partial<Doctor>) => {
  const newDoctor = doctorRepository.create(doctor);
  return doctorRepository.save(newDoctor);
};

export const updateDoctor = async (
  doctorId: string,
  doctor: Partial<Doctor>,
) => {
  await doctorRepository.update(doctorId, doctor);
  return doctorRepository.findOneBy({ id: doctorId });
};
