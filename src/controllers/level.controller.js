import Level from "../models/level.model.js";

export const createLevel = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "El campo 'name' es obligatorio" });
    }

    const newLevel = await Level.create({ name });
    return res.status(201).json(newLevel);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear nivel", error: error.message });
  }
};

export const getLevels = async (req, res) => {
  try {
    const levels = await Level.findAll();
    return res.json(levels);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener niveles", error: error.message });
  }
};

export const getLevelById = async (req, res) => {
  try {
    const { id } = req.params;
    const level = await Level.findByPk(id);

    if (!level) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    return res.json(level);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener nivel", error: error.message });
  }
};

export const updateLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const level = await Level.findByPk(id);
    if (!level) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    level.name = name || level.name;
    await level.save();

    return res.json(level);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar nivel", error: error.message });
  }
};

export const deleteLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const level = await Level.findByPk(id);

    if (!level) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    await level.destroy();
    return res.json({ message: "Nivel eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar nivel", error: error.message });
  }
};
