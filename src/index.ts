import * as dotenv from "dotenv";
import express from "express";

import * as cors from "cors";

import "reflect-metadata";
import { userRouter } from "./routes/user.routes";
import { doctorRouter } from "./routes/doctor.routes";
import { AppDataSource } from "./data-source";
import path = require("path");
dotenv.config();

const app = express();

app.use(express.json());
const { PORT = 8080 } = process.env;

app.use("/auth", userRouter);
app.use("/doctors", doctorRouter);
app.use("/uploads", express.static("uploads"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../build/swagger.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
