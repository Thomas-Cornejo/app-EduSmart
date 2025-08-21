import sequelize from "../database.js";
import { DataTypes } from "sequelize";
import { Level } from "./level.model.js";

export const Classroom = sequelize.define("classrooms", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
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

Level.hasMany(Classroom, { foreignKey: "level_id" });
Classroom.belongsTo(Level, { foreignKey: "level_id" });

export default Classroom;
