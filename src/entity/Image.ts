// Image.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  doctorId: string; // Correct type to match Doctor.id

  @ManyToOne(() => Doctor, (entity: Doctor) => entity.id)
  @JoinColumn({ name: "doctorId" }) // Specify the column to use for the join
  doctor: Doctor;
}
