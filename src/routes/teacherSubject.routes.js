import { Router } from "express";
import {
  createTeacherSubject,
  getTeacherSubjects,
  getTeacherSubjectById,
  updateTeacherSubject,
  deleteTeacherSubject,
} from "../controllers/teacherSubject.controller.js";
const teacherSubjectRoutes = Router();

teacherSubjectRoutes.get("/subjects", getTeacherSubjects);
teacherSubjectRoutes.get("/subjects/:id_teacherSubject", getTeacherSubjectById);

teacherSubjectRoutes.post("/subjects", createTeacherSubject);

teacherSubjectRoutes.delete(
  "/subjects/:id_teacherSubject",
  deleteTeacherSubject
);

teacherSubjectRoutes.put("/subjects/:id_teacherSubject", updateTeacherSubject);

export default teacherSubjectRoutes;
