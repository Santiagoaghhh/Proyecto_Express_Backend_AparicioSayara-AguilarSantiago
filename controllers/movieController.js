import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from "../models/movieModel.js";
import { ObjectId } from "mongodb";

export async function addMovie(req, res) {
  try {
    const { titulo, descripcion, categoria, anio, imagen } = req.body;

    if (!titulo || !descripcion || !categoria || !anio) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const result = await createMovie({ titulo, descripcion, categoria, anio, imagen });
    res.status(201).json({ msg: "Película creada", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear película", error: error.message });
  }
}

export async function listMovies(req, res) {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener películas", error: error.message });
  }
}

export async function getMovie(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const movie = await getMovieById(new ObjectId(id));
    if (!movie) return res.status(404).json({ msg: "Película no encontrada" });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener película", error: error.message });
  }
}

export async function editMovie(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const updateData = req.body;
    const result = await updateMovie(new ObjectId(id), updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Película no encontrada" });
    }

    res.json({ msg: "Película actualizada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar película", error: error.message });
  }
}

export async function removeMovie(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const result = await deleteMovie(new ObjectId(id));
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Película no encontrada" });
    }

    res.json({ msg: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar película", error: error.message });
  }
}
