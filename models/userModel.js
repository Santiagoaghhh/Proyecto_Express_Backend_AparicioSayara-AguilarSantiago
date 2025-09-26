// src/models/userModel.js
import {getDB } from "../config/db.js";
import bcrypt from "bcryptjs";

const COLLECTION = "usuarios";

async function createUser(userData) {
  const db = getDB();
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = {
    nombre: userData.nombre,
    correo: userData.correo,
    password: hashedPassword,
    rol: userData.rol || "usuario", // por defecto usuario
    creadoEn: new Date(),
  };

  const result = await db.collection(COLLECTION).insertOne(newUser);
  return result;
}

async function findUserByEmail(email) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({ correo: email });
}

export { createUser, findUserByEmail };
