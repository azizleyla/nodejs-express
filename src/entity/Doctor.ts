import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Image } from "./Image";

@Entity({ name: "doctors" })
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false })
  position: string;

  @OneToMany(() => Image, (image) => image.doctor)
  images: Image[]; // Assuming 'doctor' is the correct property name

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
