import { Router } from "express";
import {
  createSchedule,
  getSchedules,
  getScheduleById,
  deleteSchedule,
  updateSchedule,
} from "../controllers/schedule.controller.js";
const scheduleRoutes = Router();

scheduleRoutes.get("/schedules", getSchedules);
scheduleRoutes.get("/schedules/:id_user", getScheduleById);

scheduleRoutes.post("/schedules", createSchedule);

scheduleRoutes.delete("/schedules/:id_user", deleteSchedule);

scheduleRoutes.put("/schedules/:id_user", updateSchedule);

export default scheduleRoutes;
