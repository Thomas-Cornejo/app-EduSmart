import { Router } from "express";
import {
  createSchedule,
  getSchedules,
  deleteSchedule,
  updateSchedule,
} from "../controllers/schedule.controller.js";
const scheduleRoutes = Router();

scheduleRoutes.get("/schedules", getSchedules);

scheduleRoutes.post("/schedules", createSchedule);

scheduleRoutes.delete("/schedules/:id_shcedule", deleteSchedule);

scheduleRoutes.put("/schedules/:id_shcedule", updateSchedule);

export default scheduleRoutes;
