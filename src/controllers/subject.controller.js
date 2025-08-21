import Subject from "../models/subject.model.js";

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la asignatura es obligatorio" });
    }
    const exists = await Subject.findOne({ where: { name } });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Ya existe una asignatura con ese nombre" });
    }
    const subject = await Subject.create({ name });
    return res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear la asignatura", error: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.status(200).json(subjects);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener asignaturas", error: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }

    return res.status(200).json(subject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener asignatura", error: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }
    const exists = await Subject.findOne({ where: { name } });
    if (exists && exists.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: "Ya existe otra asignatura con ese nombre" });
    }

    subject.name = name || subject.name;
    await subject.save();

    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar asignatura",
      error: error.message,
    });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }
    await subject.destroy();
    return res
      .status(200)
      .json({ message: "Asignatura eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar asignatura", error: error.message });
  }
};
