// src/controllers/reactionController.js
import { ObjectId } from "mongodb";
import { getReviewById } from "../models/reviewModel.js";
import {
  findReaction,
  addReaction,
  updateReaction,
  removeReaction,
  countReactions
} from "../models/reactionModel.js";

export async function reactToReview(req, res) {
  try {
    const { id } = req.params; // id de reseña
    const { tipo } = req.body; // "like" o "dislike"
    const idUsuario = req.user.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID de reseña inválido" });
    }
    if (tipo !== "like" && tipo !== "dislike") {
      return res.status(400).json({ msg: "Tipo de reacción inválido" });
    }

    const review = await getReviewById(new ObjectId(id));
    if (!review) return res.status(404).json({ msg: "Reseña no encontrada" });

    if (review.idUsuario.toString() === idUsuario) {
      return res
        .status(403)
        .json({ msg: "No puedes reaccionar a tu propia reseña" });
    }

    const existing = await findReaction(id, idUsuario);

    // Toggle: si ya existe la misma reacción → eliminar
    if (existing && existing.tipo === tipo) {
      await removeReaction(id, idUsuario);
      return res.json({ msg: `🔄 ${tipo} quitado` });
    }

    // Si existe pero con tipo diferente → actualizar
    if (existing) {
      await updateReaction(id, idUsuario, tipo);
      return res.json({ msg: `🔄 Reacción actualizada a ${tipo}` });
    }

    // Si no existe → crear nueva
    await addReaction({
      idReseña: id,
      idUsuario,
      tipo,
      fecha: new Date()
    });

    res.json({ msg: `✅ ${tipo} agregado` });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al reaccionar", error: error.message });
  }
}

export async function getReactions(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID de reseña inválido" });
    }

    const counts = await countReactions(id);

    // Convertir a objeto { likes: X, dislikes: Y }
    const result = { likes: 0, dislikes: 0 };
    counts.forEach((c) => {
      if (c._id === "like") result.likes = c.total;
      if (c._id === "dislike") result.dislikes = c.total;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al obtener reacciones", error: error.message });
  }
}
