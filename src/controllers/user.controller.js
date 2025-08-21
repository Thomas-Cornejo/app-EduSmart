import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Cannot list all users", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, lastname, email, phone, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) return res.status(400).json(["The email is already in use"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      email,
      phone,
      password: passwordHash,
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password, rol } = req.body;
    const user = await User.findByPk(id);

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.rol = rol;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Auth User.
export const register = async (req, res) => {
  const { name, lastname, email, phone, password } = req.body;
  try {
    const userByEmail = await User.findOne({ where: { email } });
    if (userByEmail)
      return res.status(400).json(["El correo electrónico ya está en uso"]);

    const userByNIT = await User.findOne({ where: { nit } });
    if (userByNIT) return res.status(400).json(["El NIT ya está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      email,
      phone,
      password: passwordHash,
    });

    const token = await createAccessToken({ id: newUser.id });
    res.cookie("token", token);
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credential" });

    const token = await createAccessToken({ id: userFound.id });
    res.cookie("token", token);
    res.status(201).json({
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
      phone: userFound.phone,
      rol: userFound.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findByPk(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });
  console.log(req.user);

  return res.json({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    phone: userFound.phone,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findByPk(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    });
  });
};
