// src/controllers/loginController.js
import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export async function register(req, res) {
  try {
    const { nombre, apellido, email, password } = req.body;
    const db = getDB();
    const usersCollection = db.collection("usuarios");

    // Verificar si ya existe
    const existe = await usersCollection.findOne({ email });
    if (existe) return res.status(400).json({ error: "Usuario ya registrado" });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario (ya sin "telefono")
    const newUser = new User({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });

    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const usersCollection = db.collection("usuarios");

    // Buscar usuario por email
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Contraseña incorrecta" });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}
