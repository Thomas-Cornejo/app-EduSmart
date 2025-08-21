import sequelize from "../../database.js";
import { DataTypes } from "sequelize";
import { Level } from "./level.model.js";

export const TemplateSchedule = sequelize.define("templates_schedules", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  day_blocks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Level,
      key: "id",
    },
  },
});

Level.hasMany(TemplateSchedule, {
  foreignKey: "level_id",
  onDelete: "CASCADE",
});
TemplateSchedule.belongsTo(Level, {
  foreignKey: "level_id",
  onDelete: "CASCADE",
});

export default TemplateSchedule;
