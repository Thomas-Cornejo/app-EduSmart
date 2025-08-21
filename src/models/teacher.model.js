import sequelize from "../../database.js";
import { DataTypes } from "sequelize";
import { User } from "./user.models.js";

export const Teacher = sequelize.define("teachers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Teacher.belongsTo(User, { foreignKey: "id_user" });
User.hasOne(Teacher, { foreignKey: "id_user" });
export default Teacher;
