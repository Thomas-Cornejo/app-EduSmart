import { Router } from "express";
import {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassrooms,
} from "../controllers/classroom.controller.js";
const classroomRoutes = Router();

classroomRoutes.post("/levels", createClassroom);
classroomRoutes.get("/levels", getClassrooms);
classroomRoutes.put("/levels/:id_levels", updateClassroom);
classroomRoutes.delete("/levels/:id_levels", deleteClassroom);

export default classroomRoutes;
