// src/models/userModel.js
const { getDB } = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = { createUser, findUserByEmail };
