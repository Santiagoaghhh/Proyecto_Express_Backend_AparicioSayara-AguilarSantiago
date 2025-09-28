import express from "express";
import { reactToReview, getReactions } from "../controllers/reactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reacciones
 *   description: Endpoints para gestionar likes y dislikes en reseñas
 */

/**
 * @swagger
 * /reactions/{id}/react:
 *   post:
 *     summary: Reaccionar a una reseña (like o dislike)
 *     description: Alterna entre agregar y quitar la reacción. Si ya existe la contraria, la cambia.
 *     tags: [Reacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [like, dislike]
 *     responses:
 *       200:
 *         description: Reacción registrada o actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Reseña no encontrada
 */
router.post("/:id/react", authMiddleware, reactToReview);

/**
 * @swagger
 * /reactions/{id}/reactions:
 *   get:
 *     summary: Obtener conteo de reacciones de una reseña
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Conteo de reacciones obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                 dislikes:
 *                   type: integer
 *       404:
 *         description: Reseña no encontrada
 */
router.get("/:id/reactions", getReactions);

export default router;
