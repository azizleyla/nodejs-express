import { DataSource } from "typeorm";
import "reflect-metadata";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Doctor } from "./entity/Doctor";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  NODE_ENV,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Doctor],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});
