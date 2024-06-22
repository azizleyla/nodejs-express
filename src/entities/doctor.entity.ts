import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  img_path: string;

  @Column({ nullable: true })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
