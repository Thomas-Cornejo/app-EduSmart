import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import teacherRoutes from "./src/routes/teacher.routes.js";
import subjectRoutes from "./src/routes/subject.routes.js";
import teacherSubjectRoutes from "./src/routes/teacherSubject.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", teacherRoutes);
app.use("/api", subjectRoutes);
app.use("/api", teacherSubjectRoutes);

export default app;
