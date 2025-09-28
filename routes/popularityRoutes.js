import express from "express";
import { getPopularMovies } from "../controllers/popularityController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Populares
 *   description: Endpoints para películas populares basadas en likes/dislikes
 */

/**
 * @swagger
 * /populares:
 *   get:
 *     summary: Obtener películas más populares
 *     description: Devuelve las películas ordenadas por popularidad (likes - dislikes). Por defecto limita a 10 resultados.
 *     tags: [Populares]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Número máximo de resultados (ejemplo: 5, 10, 20)"
 *     responses:
 *       200:
 *         description: Lista de películas populares obtenida con éxito
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
 *                   totalLikes:
 *                     type: integer
 *                   totalDislikes:
 *                     type: integer
 *                   popularidad:
 *                     type: integer
 */
router.get("/", getPopularMovies);

export default router;
