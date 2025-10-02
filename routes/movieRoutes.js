import express from "express";
import {
  addMovie,
  listMovies,
  getMovie,
  editMovie,
  removeMovie,
  listMoviesByCategory,
  listMoviesByYear, // 👈 faltaba importar
} from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { validateMovie } from "../middleware/validateMovieMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para gestionar películas
 */

/** 
 * @swagger
 * /movies:
 *   get:
 *     summary: Listar todas las películas
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Buscar películas por título
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría (ObjectId)
 *     responses:
 *       200:
 *         description: Lista de películas obtenida con éxito
 */
router.get("/", listMovies);

/** 
 * @swagger
 * /movies/category/{idCategoria}:
 *   get:
 *     summary: Listar películas por categoría
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría (ObjectId)
 *     responses:
 *       200:
 *         description: Lista de películas obtenida con éxito
 *       404:
 *         description: No se encontraron películas en esta categoría
 */
router.get("/category/:idCategoria", listMoviesByCategory);

/** 
 * @swagger
 * /movies/category/{idCategoria}:
 *   get:
 *     summary: Listar películas por categoría
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: idCategoria
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría (ObjectId)
 *     responses:
 *       200:
 *         description: Lista de películas obtenida con éxito
 *       404:
 *         description: No se encontraron películas en esta categoría
 */

router.get("/year/:anno", listMoviesByYear);
/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: Película no encontrada
 */
router.get("/:id", getMovie);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - anno
 *               - idCategoria
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               anno:
 *                 type: integer
 *               imagen:
 *                 type: string
 *               estado:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [movie, series, anime]
 *               idCategoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Película creada con éxito
 *       400:
 *         description: Error en validación de datos
 */
router.post("/", authMiddleware, authorizeRoles("admin"), validateMovie, addMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Editar una película
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               anno:
 *                 type: integer
 *               imagen:
 *                 type: string
 *               estado:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [movie, series, anime]
 *               idCategoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Película actualizada con éxito
 *       404:
 *         description: Película no encontrada
 */
router.put("/:id", authMiddleware, authorizeRoles("admin"), validateMovie, editMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar una película
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada con éxito
 *       404:
 *         description: Película no encontrada
 */
router.delete("/:id", authMiddleware, authorizeRoles("admin"), removeMovie);

export default router;
