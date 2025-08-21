import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import teacherRoutes from "./src/routes/teacher.routes.js";
import subjectRoutes from "./src/routes/subject.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", teacherRoutes);
app.use("/api", subjectRoutes);

export default app;
