import Schedule from "../models/schedule.model.js";
import BlockSchedule from "../models/blockSchedule.model.js";
import TeacherSubject from "../models/teacherSubject.model.js";
import Classroom from "../models/classroom.model.js";

export const createSchedule = async (req, res) => {
  const { grade, block_schedule_id, classroom_id, teacher_subject_id } =
    req.body;

  try {
    const block = await BlockSchedule.findByPk(block_schedule_id);
    if (!block)
      return res.status(400).json({ message: "El bloque horario no existe" });

    const classroom = await Classroom.findByPk(classroom_id);
    if (!classroom)
      return res.status(400).json({ message: "El aula no existe" });

    const teacherSubject = await TeacherSubject.findByPk(teacher_subject_id);
    if (!teacherSubject)
      return res
        .status(400)
        .json({ message: "La relación docente-asignatura no existe" });
    const teacherConflict = await Schedule.findOne({
      where: { block_schedule_id, teacher_subject_id },
    });
    if (teacherConflict) {
      return res.status(400).json({
        message: "El docente ya tiene asignada una clase en este bloque",
      });
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

    const scheduleWithRelations = await Schedule.findByPk(schedule.id, {
      include: [BlockSchedule, TeacherSubject, Classroom],
    });

    res.status(201).json(scheduleWithRelations);
  } catch (error) {
    console.error("Error creando horario:", error);
    res.status(500).json({ message: "Error al crear el horario" });
  }
};
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [BlockSchedule, TeacherSubject, Classroom],
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener horarios" });
  }
};
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { grade, block_schedule_id, classroom_id, teacher_subject_id } =
    req.body;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule)
      return res.status(404).json({ message: "Horario no encontrado" });
    if (block_schedule_id || classroom_id || teacher_subject_id) {
      const block = block_schedule_id || schedule.block_schedule_id;
      const classroom = classroom_id || schedule.classroom_id;
      const teacherSubject = teacher_subject_id || schedule.teacher_subject_id;
      const teacherConflict = await Schedule.findOne({
        where: {
          block_schedule_id: block,
          teacher_subject_id: teacherSubject,
          id: { $ne: id },
        },
      });
      if (teacherConflict) {
        return res.status(400).json({
          message: "El docente ya tiene asignada una clase en este bloque",
        });
      }
      const classroomConflict = await Schedule.findOne({
        where: {
          block_schedule_id: block,
          classroom_id: classroom,
          id: { $ne: id },
        },
      });
      if (classroomConflict) {
        return res
          .status(400)
          .json({ message: "El aula ya está ocupada en este bloque" });
      }
    }

    await schedule.update({
      grade,
      block_schedule_id,
      classroom_id,
      teacher_subject_id,
    });
    const updatedSchedule = await Schedule.findByPk(id, {
      include: [BlockSchedule, TeacherSubject, Classroom],
    });

    res.json(updatedSchedule);
  } catch (error) {
    console.error("Error actualizando horario:", error);
    res.status(500).json({ message: "Error al actualizar el horario" });
  }
};

export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule)
      return res.status(404).json({ message: "Horario no encontrado" });

    await schedule.destroy();
    res.json({ message: "Horario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el horario" });
  }
};
