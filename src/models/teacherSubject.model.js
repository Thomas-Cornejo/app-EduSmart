import sequelize from "../../database.js";
import { DataTypes } from "sequelize";
import { Teacher } from "./teacher.model.js";
import { Subject } from "./subject.model.js";

export const TeacherSubject = sequelize.define(
  "teachers_subjects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    year_assigned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["teacher_id", "subject_id"],
      },
    ],
  }
);

Teacher.belongsToMany(Subject, {
  through: TeacherSubject,
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});
Subject.belongsToMany(Teacher, {
  through: TeacherSubject,
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

TeacherSubject.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});
TeacherSubject.belongsTo(Subject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});
Teacher.hasMany(TeacherSubject, {
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});
Subject.hasMany(TeacherSubject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

export default TeacherSubject;
