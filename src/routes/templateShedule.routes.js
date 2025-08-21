import { Router } from "express";
import {
  createTemplateSchedule,
  getTemplates,
  deleteTemplateSchedule,
  updateTemplateSchedule,
} from "../controllers/templateSchedule.controller.js";
const templateSchedulesRoutes = Router();

templateSchedulesRoutes.get("/templateschedules", getTemplates);

templateSchedulesRoutes.post("/templateschedules", createTemplateSchedule);

templateSchedulesRoutes.delete(
  "/templateschedules/:id_templateschedules",
  deleteTemplateSchedule
);

templateSchedulesRoutes.put(
  "/templateschedules/:id_templateschedules",
  updateTemplateSchedule
);

export default templateSchedulesRoutes;
