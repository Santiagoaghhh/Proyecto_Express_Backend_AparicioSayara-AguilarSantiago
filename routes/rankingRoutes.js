import express from "express";
import { getMovieRanking } from "../controllers/rankingController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: Endpoints para ranking de películas basado en calificaciones
 */

/**
 * @swagger
 * /ranking:
 *   get:
 *     summary: Obtener ranking de películas
 *     description: Devuelve las películas ordenadas por su promedio de rating (1–5).
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: Ranking obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   anno:
 *                     type: integer
 *                   categoria:
 *                     type: string
 *                   promedioRating:
 *                     type: number
 *                   totalReseñas:
 *                     type: integer
 */
router.get("/", getMovieRanking);

export default router;
