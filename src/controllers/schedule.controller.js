import Schedule from "../models/schedule.model.js";
import TeacherSubject from "../models/teacherSubject.model.js";
import BlockSchedule from "../models/blockSchedule.model.js";
import Classroom from "../models/classroom.model.js";

export const createSchedule = async (req, res) => {
  try {
    const { grade, block_schedule_id, classroom_id, teacher_subject_id } =
      req.body;

    const teacherSubject = await TeacherSubject.findByPk(teacher_subject_id);
    if (!teacherSubject)
      return res
        .status(404)
        .json({ message: "Docente-Asignatura no encontrado" });

    const block = await BlockSchedule.findByPk(block_schedule_id);
    if (!block)
      return res.status(404).json({ message: "Bloque horario no encontrado" });

    const classroom = await Classroom.findByPk(classroom_id);
    if (!classroom)
      return res.status(404).json({ message: "Aula no encontrada" });

    const teacherConflict = await Schedule.findOne({
      where: { block_schedule_id, teacher_subject_id },
    });
    if (teacherConflict) {
      return res
        .status(400)
        .json({ message: "El docente ya tiene clase en este bloque" });
    }

    const classroomConflict = await Schedule.findOne({
      where: { block_schedule_id, classroom_id },
    });
    if (classroomConflict) {
      return res
        .status(400)
        .json({ message: "El aula ya está ocupada en este bloque" });
    }

    const schedule = await Schedule.create({
      grade,
      block_schedule_id,
      classroom_id,
      teacher_subject_id,
    });

    return res.status(201).json(schedule);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear horario", error: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: TeacherSubject, include: ["teacher", "subject"] },
        { model: BlockSchedule },
        { model: Classroom },
      ],
    });

    return res.status(200).json(schedules);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener horarios", error: error.message });
  }
};
export const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByPk(id, {
      include: [
        { model: TeacherSubject, include: ["teacher", "subject"] },
        { model: BlockSchedule },
        { model: Classroom },
      ],
    });

    if (!schedule)
      return res.status(404).json({ message: "Horario no encontrado" });

    return res.status(200).json(schedule);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener horario", error: error.message });
  }
};
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, block_schedule_id, classroom_id, teacher_subject_id } =
      req.body;

    const schedule = await Schedule.findByPk(id);
    if (!schedule)
      return res.status(404).json({ message: "Horario no encontrado" });
    if (teacher_subject_id) {
      const teacherSubject = await TeacherSubject.findByPk(teacher_subject_id);
      if (!teacherSubject)
        return res
          .status(404)
          .json({ message: "Docente-Asignatura no encontrado" });
    }
    if (block_schedule_id) {
      const block = await BlockSchedule.findByPk(block_schedule_id);
      if (!block)
        return res
          .status(404)
          .json({ message: "Bloque horario no encontrado" });
    }
    if (classroom_id) {
      const classroom = await Classroom.findByPk(classroom_id);
      if (!classroom)
        return res.status(404).json({ message: "Aula no encontrada" });
    }

    if (block_schedule_id && teacher_subject_id) {
      const teacherConflict = await Schedule.findOne({
        where: { block_schedule_id, teacher_subject_id },
      });
      if (teacherConflict && teacherConflict.id !== schedule.id) {
        return res
          .status(400)
          .json({ message: "El docente ya tiene clase en este bloque" });
      }
    }

    if (block_schedule_id && classroom_id) {
      const classroomConflict = await Schedule.findOne({
        where: { block_schedule_id, classroom_id },
      });
      if (classroomConflict && classroomConflict.id !== schedule.id) {
        return res
          .status(400)
          .json({ message: "El aula ya está ocupada en este bloque" });
      }
    }
    schedule.grade = grade || schedule.grade;
    schedule.block_schedule_id =
      block_schedule_id || schedule.block_schedule_id;
    schedule.classroom_id = classroom_id || schedule.classroom_id;
    schedule.teacher_subject_id =
      teacher_subject_id || schedule.teacher_subject_id;

    await schedule.save();

    return res.status(200).json(schedule);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar horario", error: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByPk(id);
    if (!schedule)
      return res.status(404).json({ message: "Horario no encontrado" });

    await schedule.destroy();

    return res.status(200).json({ message: "Horario eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar horario", error: error.message });
  }
};
