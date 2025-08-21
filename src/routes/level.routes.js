import { Router } from "express";
import {
  createLevel,
  getLevels,
  getLevelById,
  updateLevel,
  deleteLevel,
} from "../controllers/level.controller.js";

const levelRoutes = Router();

levelRoutes.post("/levels", createLevel);
levelRoutes.get("/levels", getLevels);
levelRoutes.get("/levels/:id_levels", getLevelById);
levelRoutes.put("/levels/:id_levels", updateLevel);
levelRoutes.delete("/levels/:id_levels", deleteLevel);

export default levelRoutes;
