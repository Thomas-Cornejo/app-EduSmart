import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/user.controller.js";
import { authRequire } from "../middleware/validateToken.js";
const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id_user", getUser);
userRoutes.get("/profile", authRequire, profile);
userRoutes.get("/verify", verifyToken);

userRoutes.post("/users", createUser);
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);

userRoutes.delete("/users/:id_user", deleteUser);

userRoutes.put("/users/:id_user", updateUser);

export default userRoutes;
