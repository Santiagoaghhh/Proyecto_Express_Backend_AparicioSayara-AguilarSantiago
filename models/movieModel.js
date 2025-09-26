// src/models/movieModel.js
import { getDB } from "../config/db.js";

const COLLECTION = "peliculas";

export async function createMovie(movieData) {
  const db = getDB();
  const nuevaPelicula = {
    titulo: movieData.titulo,
    descripcion: movieData.descripcion,
    categoria: movieData.categoria,
    anio: movieData.anio,
    imagen: movieData.imagen || null,
    creadaEn: new Date(),
    aprobada: movieData.aprobada || false, // solo admin aprueba
  };
  const result = await db.collection(COLLECTION).insertOne(nuevaPelicula);
  return result;
}

export async function getMovies() {
  const db = getDB();
  return await db.collection(COLLECTION).find().toArray();
}

export async function getMovieById(id) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({ _id: id });
}

export async function updateMovie(id, updateData) {
  const db = getDB();
  const result = await db.collection(COLLECTION).updateOne(
    { _id: id },
    { $set: updateData }
  );
  return result;
}

export async function deleteMovie(id) {
  const db = getDB();
  const result = await db.collection(COLLECTION).deleteOne({ _id: id });
  return result;
}
