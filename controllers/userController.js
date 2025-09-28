// src/controllers/userController.js
import { createUser, findUserByEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
  try {
    // aceptar ambos: español e inglés
    const nombre = req.body.nombre || req.body.name;
    const correo = req.body.correo || req.body.email;
    const { password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const existingUser = await findUserByEmail(correo);
    if (existingUser) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    await createUser({ nombre, correo, password, rol });
    res.status(201).json({ msg: "✅ Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error en el registro", error: error.message });
  }
}


async function loginUser(req, res) {
  try {
    const { correo, password } = req.body;
    const user = await findUserByEmail(correo);

    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ msg: "Error en el login", error: error.message });
  }
}

export { registerUser, loginUser };
