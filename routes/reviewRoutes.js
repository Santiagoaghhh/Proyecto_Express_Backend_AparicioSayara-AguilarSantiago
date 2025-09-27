// src/routes/reviewRoutes.js
import express from "express";
import {
  addReview,
  listReviews,
  editReview,
  removeReview,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Crear reseña (usuario autenticado)
router.post("/", authMiddleware, addReview);

// Listar reseñas de una película
router.get("/:movieId", listReviews);

// Editar reseña (solo dueño)
router.put("/:id", authMiddleware, editReview);

// Eliminar reseña (solo dueño)
router.delete("/:id", authMiddleware, removeReview);

export default router;
