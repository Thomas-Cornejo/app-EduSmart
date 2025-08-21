import Classroom from "../models/classroom.model.js";
import { Level } from "../models/level.model.js";

export const createClassroom = async (req, res) => {
  const { name, capacity, location, level_id } = req.body;

  try {
    const level = await Level.findByPk(level_id);
    if (!level) {
      return res.status(400).json({ message: "El nivel no existe" });
    }

    const classroom = await Classroom.create({
      name,
      capacity,
      location,
      level_id,
    });

    res.status(201).json(classroom);
  } catch (error) {
    console.error("Error creando aula:", error);
    res.status(500).json({ message: "Error al crear el aula" });
  }
};

export const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.findAll({
      include: [{ model: Level }],
    });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las aulas" });
  }
};

export const updateClassroom = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location, level_id } = req.body;

  try {
    const classroom = await Classroom.findByPk(id);
    if (!classroom)
      return res.status(404).json({ message: "Aula no encontrada" });

    if (level_id) {
      const level = await Level.findByPk(level_id);
      if (!level) {
        return res.status(400).json({ message: "El nivel no existe" });
      }
    }

    await classroom.update({ name, capacity, location, level_id });
    res.json(classroom);
  } catch (error) {
    console.error("Error actualizando aula:", error);
    res.status(500).json({ message: "Error al actualizar el aula" });
  }
};

export const deleteClassroom = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.findByPk(id);
    if (!classroom)
      return res.status(404).json({ message: "Aula no encontrada" });

    await classroom.destroy();
    res.json({ message: "Aula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el aula" });
  }
};
