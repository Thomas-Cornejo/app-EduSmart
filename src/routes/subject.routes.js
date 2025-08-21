import { Router } from "express";
import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/schedule.controller.js";
const subjectRoutes = Router();

subjectRoutes.get("/subjects", getSubjects);
subjectRoutes.get("/subjects/:id_subject", getSubjectById);

subjectRoutes.post("/subjects", createSubject);

subjectRoutes.delete("/subjects/:id_subject", deleteSubject);

subjectRoutes.put("/subjects/:id_subject", updateSubject);

export default subjectRoutes;
