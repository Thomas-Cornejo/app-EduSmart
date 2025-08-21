import { Router } from "express";
import {
  createTemplateSchedule,
  getTemplateById,
  deleteTemplateSchedule,
  updateTemplateSchedule,
} from "../controllers/templateSchedule.controller.js";
const templateSchedulesRoutes = Router();

templateSchedulesRoutes.get(
  "/templates_schedules/:id_templateschedules",
  getTemplateById
);

templateSchedulesRoutes.post("/templates_schedules", createTemplateSchedule);

templateSchedulesRoutes.delete(
  "/templates_schedules/:id_templateschedules",
  deleteTemplateSchedule
);

templateSchedulesRoutes.put(
  "/templates_schedules/:id_templateschedules",
  updateTemplateSchedule
);

export default templateSchedulesRoutes;
