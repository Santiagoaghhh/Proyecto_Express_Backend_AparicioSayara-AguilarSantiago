// src/controllers/moviesController.js
import { getDB } from "../config/db.js";
import { Movie } from "../models/movieModel.js";

export async function createMovie(req, res) {
  try {
    const { titulo, descripcion, categoria, anio, imagen } = req.body;
    const db = getDB();
    const moviesCollection = db.collection("peliculas");

// Evitar títulos repetidos
    const existe = await moviesCollection.findOne({ titulo });
    if (existe) return res.status(400).json({ error: "La película ya existe" });

    const newMovie = new Movie({ titulo, descripcion, categoria, anio, imagen });
    await moviesCollection.insertOne(newMovie);

    res.status(201).json({ message: "Película creada", movie: newMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear película" });
  }
}

// Listar todas las películas
export async function getMovies(req, res) {
  try {
    const db = getDB();
    const movies = await db.collection("peliculas").find().toArray();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener películas" });
  }
}

// Detalle por ID
export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();
    const movie = await db.collection("peliculas").findOne({ _id: new ObjectId(id) });

    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener película" });
  }
}

// Actualizar
export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, anio, imagen, aprobada } = req.body;
    const db = getDB();

    const result = await db.collection("peliculas").updateOne(
      { _id: new ObjectId(id) },
      { $set: { titulo, descripcion, categoria, anio, imagen, aprobada } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar película" });
  }
}

// Eliminar
export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();

    const result = await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });

    res.json({ message: "Película eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar película" });
  }
}
