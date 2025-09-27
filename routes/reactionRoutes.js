// src/routes/reactionRoutes.js
import express from "express";
import { reactToReview, getReactions } from "../controllers/reactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Reaccionar (like/dislike con toggle)
router.post("/:id/react", authMiddleware, reactToReview);

// Obtener conteo de reacciones
router.get("/:id/reactions", getReactions);

export default router;
