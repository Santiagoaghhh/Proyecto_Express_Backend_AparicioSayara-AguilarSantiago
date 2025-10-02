// src/controllers/historislController.js
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const db = getDB();

// registro de reseñas
export async function listReviews(req, res) {
    try {
      const { movieId } = req.params;
      if (!ObjectId.isValid(movieId)) {
        return res.status(400).json({ msg: "ID de película inválido" });
      }
  
      const reviews = await getReviewsByMovie(new ObjectId(movieId));
      res.json(reviews);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "❌ Error al obtener reseñas", error: error.message });
    }
  }

  // editarlas
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
        return res
          .status(403)
          .json({ msg: "No puedes editar reseñas de otros usuarios" });
      }
  
      updateData.actualizadaEn = new Date();
      await updateReview(new ObjectId(id), updateData);
  
      res.json({ msg: "✅ Reseña actualizada" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "❌ Error al editar reseña", error: error.message });
    }
  }
  
  // eliminarlas
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
        return res
          .status(403)
          .json({ msg: "No puedes eliminar reseñas de otros usuarios" });
      }
  
      await deleteReview(new ObjectId(id));
      res.json({ msg: "✅ Reseña eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "❌ Error al eliminar reseña", error: error.message });
    }
  }
  