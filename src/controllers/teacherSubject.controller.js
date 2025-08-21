import TeacherSubject from "../models/teacherSubject.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";

export const createTeacherSubject = async (req, res) => {
  try {
    const { teacher_id, subject_id, year_assigned, status } = req.body;
    const teacher = await Teacher.findByPk(teacher_id);
    if (!teacher) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }

    const subject = await Subject.findByPk(subject_id);
    if (!subject) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }

    const exists = await TeacherSubject.findOne({
      where: { teacher_id, subject_id },
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "El docente ya tiene asignada esta materia" });
    }

    const teacherSubject = await TeacherSubject.create({
      teacher_id,
      subject_id,
      year_assigned,
      status,
    });

    return res.status(201).json(teacherSubject);
  } catch (error) {
    return res.status(500).json({
      message: "Error al asignar materia al docente",
      error: error.message,
    });
  }
};

export const getTeacherSubjects = async (req, res) => {
  try {
    const teacherSubjects = await TeacherSubject.findAll({
      include: [
        { model: Teacher, attributes: ["id", "profession"], include: ["user"] },
        { model: Subject, attributes: ["id", "name"] },
      ],
    });

    return res.status(200).json(teacherSubjects);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener asignaciones", error: error.message });
  }
};

export const getTeacherSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherSubject = await TeacherSubject.findByPk(id, {
      include: [
        { model: Teacher, attributes: ["id", "profession"], include: ["user"] },
        { model: Subject, attributes: ["id", "name"] },
      ],
    });

    if (!teacherSubject) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    return res.status(200).json(teacherSubject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener asignación", error: error.message });
  }
};

export const updateTeacherSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher_id, subject_id, year_assigned, status } = req.body;

    const teacherSubject = await TeacherSubject.findByPk(id);
    if (!teacherSubject) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    if (teacher_id && subject_id) {
      const exists = await TeacherSubject.findOne({
        where: { teacher_id, subject_id },
      });
      if (exists && exists.id !== parseInt(id)) {
        return res
          .status(400)
          .json({ message: "El docente ya tiene esa asignatura asignada" });
      }
    }

    teacherSubject.teacher_id = teacher_id || teacherSubject.teacher_id;
    teacherSubject.subject_id = subject_id || teacherSubject.subject_id;
    teacherSubject.year_assigned =
      year_assigned || teacherSubject.year_assigned;
    teacherSubject.status = status || teacherSubject.status;

    await teacherSubject.save();

    return res.status(200).json(teacherSubject);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar asignación",
      error: error.message,
    });
  }
};

export const deleteTeacherSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherSubject = await TeacherSubject.findByPk(id);
    if (!teacherSubject) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    await teacherSubject.destroy();

    return res
      .status(200)
      .json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar asignación", error: error.message });
  }
};
