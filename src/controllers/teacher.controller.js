import { Teacher } from "../models/teacher.model.js";
import { User } from "../models/user.models.js";

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "lastname", "email", "phone"],
      },
    });
    res.json(teachers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot list teachers", error: error.message });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "lastname", "email", "phone"],
      },
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { name, lastname, email, phone, password, rol, profession } =
      req.body;
    const newUser = await User.create({
      name,
      lastname,
      email,
      phone,
      password,
      rol: rol || "Docente",
    });
    const newTeacher = await Teacher.create({
      id_user: newUser.id,
      profession,
    });

    return res.status(201).json({
      message: "Docente registrado correctamente",
      teacher: newTeacher,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al registrar docente", error: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password, rol, profession } =
      req.body;
    const teacher = await Teacher.findByPk(id, { include: User });
    if (!teacher) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    await teacher.user.update({
      name: name || teacher.user.name,
      lastname: lastname || teacher.user.lastname,
      email: email || teacher.user.email,
      phone: phone || teacher.user.phone,
      password: password || teacher.user.password,
      rol: rol || teacher.user.rol,
    });
    await teacher.update({
      profession: profession || teacher.profession,
    });

    return res.status(200).json({
      message: "Docente actualizado correctamente",
      teacher,
      user: teacher.user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar docente", error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id, { include: User });

    if (!teacher) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    await teacher.destroy();
    await teacher.user.destroy();

    return res
      .status(200)
      .json({ message: "Docente y usuario eliminados correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar docente", error: error.message });
  }
};
