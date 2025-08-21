import sequelize from "../../database.js";
import { DataTypes } from "sequelize";

export const Level = sequelize.define("levels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hours_week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Level;
