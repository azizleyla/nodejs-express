import * as express from "express";
import { UserController } from "../controller/user.controller";
import { AuthController } from "../controller/auth.controller";
import { authorization } from "../middleware/authorization";
import { authentification } from "../middleware/authentification";

const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers,
);
Router.get(
  "/profile",
  authentification,
  authorization(["admin", "doctor"]),
  AuthController.getProfile,
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.put("/update/:id", authentification, authorization(["admin"]));
Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser,
);
export { Router as userRouter };
