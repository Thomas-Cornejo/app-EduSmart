import { Router } from "express";
import {
  getTeacher,
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller.js";
const teacherRoutes = Router();

teacherRoutes.get("/teachers", getTeachers);
teacherRoutes.get("/teachers/:id_user", getTeacher);

teacherRoutes.post("/teachers", createTeacher);

teacherRoutes.delete("/teachers/:id_teacher", deleteTeacher);

teacherRoutes.put("/teachers/:id_teacher", updateTeacher);

export default teacherRoutes;
