import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { registrarAccion } from "../models/historialModel.js";

import {
  getReviewsByMovie,
  getReviewById,
  updateReview,
  deleteReview, 
} from "../models/reviewModel.js";

// ➕ CREAR RESEÑA
export async function addReview(req, res) {
  try {
    const { idPelicula, titulo, comentario, rating } = req.body;
    const idUsuario = req.user.id; // viene del JWT gracias a authMiddleware

    // Validaciones
    if (!ObjectId.isValid(idPelicula)) {
      return res.status(400).json({ msg: "ID de película inválido" });
    }
    if (!ObjectId.isValid(idUsuario)) {
      return res.status(400).json({ msg: "ID de usuario inválido" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: "La calificación debe estar entre 1 y 5" });
    }

    const db = getDB();

    // Verificar que la película exista
    const pelicula = await db
      .collection("peliculas")
      .findOne({ _id: new ObjectId(idPelicula) });
    if (!pelicula) {
      return res.status(400).json({ msg: "La película no existe" });
    }

    // Crear reseña
    const result = await db.collection("resennas").insertOne({
      idUsuario: new ObjectId(idUsuario),
      idPelicula: new ObjectId(idPelicula),
      titulo,
      comentario,
      rating,
      likes: [],
      dislikes: [],
      creadaEn: new Date(),
      actualizadaEn: null,
    });

    // ✅ Registrar en historial
    await registrarAccion(
      idUsuario,
      "registro",
      `Se creó la reseña ${result.insertedId}`
    );

    res.status(201).json({ msg: "✅ Reseña creada", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al crear reseña", error: error.message });
  }
}

// 📋 LISTAR
export async function listReviews(req, res) {
  try {
    const { movieId } = req.params;
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ msg: "ID de película inválido" });
    }

    const reviews = await getReviewsByMovie(new ObjectId(movieId));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al obtener reseñas", error: error.message });
  }
}

// ✏️ EDITAR
export async function editReview(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID de reseña inválido" });
    }

    const review = await getReviewById(new ObjectId(id));
    if (!review) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    if (review.idUsuario.toString() !== userId) {
      return res.status(403).json({ msg: "No puedes editar reseñas de otros usuarios" });
    }

    updateData.actualizadaEn = new Date();
    await updateReview(new ObjectId(id), updateData);

    // ✅ Registrar en historial
    await registrarAccion(
      userId,
      "editar",
      `Se editó la reseña ${id}`
    );

    res.json({ msg: "✅ Reseña actualizada" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al editar reseña", error: error.message });
  }
}

// 🗑️ ELIMINAR
export async function removeReview(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID de reseña inválido" });
    }

    const review = await getReviewById(new ObjectId(id));
    if (!review) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    if (review.idUsuario.toString() !== userId) {
      return res.status(403).json({ msg: "No puedes eliminar reseñas de otros usuarios" });
    }

    await deleteReview(new ObjectId(id));

    // ✅ Registrar en historial
    await registrarAccion(
      userId,
      "eliminar",
      `Se eliminó la reseña ${id}`
    );

    res.json({ msg: "✅ Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al eliminar reseña", error: error.message });
  }
}
