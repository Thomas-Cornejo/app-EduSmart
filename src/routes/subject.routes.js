import { Router } from "express";
import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule.controller.js";
const subjectRoutes = Router();

subjectRoutes.get("/subjects", getSchedules);

subjectRoutes.post("/subjects", createSchedule);

subjectRoutes.delete("/subjects/:id_subject", deleteSchedule);

subjectRoutes.put("/subjects/:id_subject", updateSchedule);

export default subjectRoutes;
