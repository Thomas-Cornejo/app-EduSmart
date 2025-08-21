import sequelize from "../../database.js";
import { DataTypes } from "sequelize";

export const Subject = sequelize.define("subjects", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Subject;
