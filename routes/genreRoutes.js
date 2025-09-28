import express from "express";
import {
  addGenre,
  listGenres,
  editGenre,
  removeGenre
} from "../controllers/genreController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Géneros
 *   description: Endpoints para gestionar géneros de películas
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Listar todos los géneros
 *     tags: [Géneros]
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida con éxito
 */
router.get("/", listGenres);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Crear un nuevo género
 *     tags: [Géneros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreCategoria
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Género creado con éxito
 *       400:
 *         description: Error en validación de datos
 */
router.post("/", authMiddleware, authorizeRoles("admin"), addGenre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Editar un género existente
 *     tags: [Géneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Género actualizado con éxito
 *       404:
 *         description: Género no encontrado
 */
router.put("/:id", authMiddleware, authorizeRoles("admin"), editGenre);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Eliminar un género
 *     tags: [Géneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género eliminado con éxito
 *       404:
 *         description: Género no encontrado
 */
router.delete("/:id", authMiddleware, authorizeRoles("admin"), removeGenre);

export default router;
