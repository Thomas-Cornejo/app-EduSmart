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
teacherSubjectRoutes.get("/subjects/:id_user", getTeacherSubjectById);

teacherSubjectRoutes.post("/subjects", createTeacherSubject);

teacherSubjectRoutes.delete("/subjects/:id_user", deleteTeacherSubject);

teacherSubjectRoutes.put("/subjects/:id_user", updateTeacherSubject);

export default teacherSubjectRoutes;
