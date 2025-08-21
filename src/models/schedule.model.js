import sequelize from "../../database.js";
import { DataTypes } from "sequelize";
import BlockSchedule from "./blockSchedule.model.js";
import TeacherSubject from "./teacherSubject.model.js";
import Classroom from "./classroom.model.js";

export const Schedule = sequelize.define(
  "schedules",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM("Lunes", "Martes", "Miércoles", "Jueves", "Viernes"),
      allowNull: false,
    },
    block_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlockSchedule,
        key: "id",
      },
    },
    classroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Classroom,
        key: "id",
      },
    },
    teacher_subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeacherSubject,
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["block_schedule_id", "classroom_id", "teacher_subject_id"],
      },
    ],
  }
);

TeacherSubject.hasMany(Schedule, {
  foreignKey: "teacher_subject_id",
  onDelete: "CASCADE",
});
Schedule.belongsTo(TeacherSubject, {
  foreignKey: "teacher_subject_id",
  onDelete: "CASCADE",
});

Schedule.belongsTo(Classroom, {
  foreignKey: "classroom_id",
});
Classroom.hasMany(Schedule, {
  foreignKey: "classroom_id",
});

BlockSchedule.hasMany(Schedule, {
  foreignKey: "block_schedule_id",
  onDelete: "CASCADE",
});
Schedule.belongsTo(BlockSchedule, {
  foreignKey: "block_schedule_id",
  onDelete: "CASCADE",
});

export default Schedule;
