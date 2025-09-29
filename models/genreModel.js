// src/models/genreModel.js
import { getDB } from "../config/db.js";

const COLLECTION = "categorias";

export async function createGenre(data) {
  const db = getDB();
  const nuevoGenero = {
    nombre: data.nombre,
    descripcion: data.descripcion || "",
    creadoEn: new Date(),
  };
  return await db.collection(COLLECTION).insertOne(nuevoGenero);
}

export async function getGenres() {
  const db = getDB();
  return await db.collection(COLLECTION).find().toArray();
}

export async function getGenreById(id) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({ _id: id });
}

export async function updateGenre(id, updateData) {
  const db = getDB();
  return await db.collection(COLLECTION).updateOne(
    { _id: id },
    { $set: updateData }
  );
}

export async function deleteGenre(id) {
  const db = getDB();
  return await db.collection(COLLECTION).deleteOne({ _id: id });
}
