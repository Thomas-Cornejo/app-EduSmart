import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import teacherRoutes from "./src/routes/teacher.routes.js";
import subjectRoutes from "./src/routes/subject.routes.js";
import teacherSubjectRoutes from "./src/routes/teacherSubject.routes.js";
import scheduleRoutes from "./src/routes/schedule.routes.js";
import templateSchedulesRoutes from "./src/routes/templateShedule.routes.js";
import levelRoutes from "./src/routes/level.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", teacherRoutes);
app.use("/api", subjectRoutes);
app.use("/api", teacherSubjectRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", templateSchedulesRoutes);
app.use("/api", levelRoutes);

export default app;
