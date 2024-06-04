import { upload } from "./middleware/image.middleware";
import * as dotenv from "dotenv";
import * as express from "express";
import * as session from "express-session";

import * as cors from "cors";

import "reflect-metadata";
import { userRouter } from "./routes/user.routes";
import { doctorRouter } from "./routes/doctor.routes";
import { AppDataSource } from "./data-source";
import path = require("path");
dotenv.config();

const app = express();

app.use(cors());

// app.use(
//   session({
//     secret: "rewnyc14!", // Change this to a secret key for session encryption
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false, // Set to true for HTTPS environments
//       maxAge: 24 * 60 * 60 * 1000, // Session expiration time (24 hours)
//     },
//   }),
// );

app.use(express.json());
const { PORT = 8080 } = process.env;

app.use("/auth", userRouter);
app.use("/doctors", doctorRouter);
app.use("/uploads", express.static("uploads"));

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
