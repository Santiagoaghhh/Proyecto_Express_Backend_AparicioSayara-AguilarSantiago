import express from "express";
import {
  addReview,
  listReviews,
  editReview,
  removeReview,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { validateReview } from "../middleware/validateReviewMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Endpoints para reseñas de películas
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Crear una reseña para una película
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idPelicula
 *               - titulo
 *               - comentario
 *               - rating
 *             properties:
 *               idPelicula:
 *                 type: string
 *               titulo:
 *                 type: string
 *               comentario:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Reseña creada con éxito
 *       400:
 *         description: Error de validación
 */
router.post("/", authMiddleware, authorizeRoles("user"), validateReview, addReview);
router.get("/", listReviews)
/**
 * @swagger
 * /reviews/{movieId}:
 *   get:
 *     summary: Listar reseñas de una película
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Lista de reseñas
 */
router.get("/:movieId", listReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Editar una reseña
 *     tags: [Reseñas]
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
 *             properties:
 *               titulo:
 *                 type: string
 *               comentario:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Reseña actualizada con éxito
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Reseña no encontrada
 */
router.put("/:id", authMiddleware, authorizeRoles("user"), validateReview, editReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña eliminada con éxito
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Reseña no encontrada
 */
router.delete("/:id", authMiddleware, authorizeRoles("user"), removeReview);

export default router;
