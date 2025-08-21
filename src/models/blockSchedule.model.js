import sequelize from "../../database.js";
import { DataTypes } from "sequelize";
import TemplateSchedule from "./templateSchedule.js";

export const BlockSchedule = sequelize.define("blocks_schedules", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  break: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  template_schedule_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TemplateSchedule,
      key: "id",
    },
  },
});

TemplateSchedule.hasMany(BlockSchedule, {
  foreignKey: "template_schedule_id",
  onDelete: "CASCADE",
});
BlockSchedule.belongsTo(TemplateSchedule, {
  foreignKey: "template_schedule_id",
  onDelete: "CASCADE",
});

export default BlockSchedule;
