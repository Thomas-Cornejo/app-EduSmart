import { Router } from "express";
import {
  createTemplateSchedule,
  getTemplates,
  deleteTemplateSchedule,
  updateTemplateSchedule,
} from "../controllers/templates_schedules.controller.js";
const templateSchedulesRoutes = Router();

templateSchedulesRoutes.get("/templates_schedules", getTemplates);

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
