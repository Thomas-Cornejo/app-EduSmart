import TemplateSchedule from "../models/templateSchedule.model.js";
import BlockSchedule from "../models/blockSchedule.model.js";
import Level from "../models/level.model.js";


export const getTemplateById = async (req, res) => {
  try {
    const template = await TemplateSchedule.findByPk(req.params.id, {
      include: [BlockSchedule],
    });

    if (!template) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la plantilla" });
  }
};
export const createTemplateSchedule = async (req, res) => {
  const { name, start_time, end_time, day_blocks, level_id, blocks } = req.body;

  try {
    const level = await Level.findByPk(level_id);
    if (!level) {
      return res
        .status(400)
        .json({ message: "El nivel especificado no existe" });
    }

    const template = await TemplateSchedule.create({
      name,
      start_time,
      end_time,
      day_blocks,
      level_id,
    });

    if (blocks && blocks.length > 0) {
      const blockData = blocks.map((block) => ({
        start_hour: block.start_hour,
        end_hour: block.end_hour,
        break: block.break || null,
        template_schedule_id: template.id,
      }));

      await BlockSchedule.bulkCreate(blockData);
    }

    const templateWithBlocks = await TemplateSchedule.findByPk(template.id, {
      include: [BlockSchedule, Level],
    });

    res.status(201).json(templateWithBlocks);
  } catch (error) {
    console.error("Error creando template:", error);
    res.status(500).json({ message: "Error al crear la plantilla" });
  }
};
export const updateTemplateSchedule = async (req, res) => {
  const { name, start_time, end_time, day_blocks, level_id, blocks } = req.body;

  try {
    const template = await TemplateSchedule.findByPk(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    await template.update({
      name,
      start_time,
      end_time,
      day_blocks,
      level_id,
    });

    if (blocks) {
      await BlockSchedule.destroy({
        where: { template_schedule_id: template.id },
      });

      const blockData = blocks.map((block) => ({
        start_hour: block.start_hour,
        end_hour: block.end_hour,
        break: block.break || null,
        template_schedule_id: template.id,
      }));

      await BlockSchedule.bulkCreate(blockData);
    }

    const updatedTemplate = await TemplateSchedule.findByPk(template.id, {
      include: [BlockSchedule],
    });

    res.json(updatedTemplate);
  } catch (error) {
    console.error("Error actualizando template:", error);
    res.status(500).json({ message: "Error al actualizar la plantilla" });
  }
};

export const deleteTemplateSchedule = async (req, res) => {
  try {
    const template = await TemplateSchedule.findByPk(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }

    await BlockSchedule.destroy({
      where: { template_schedule_id: template.id },
    });
    await template.destroy();

    res.json({ message: "Plantilla eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la plantilla" });
  }
};
