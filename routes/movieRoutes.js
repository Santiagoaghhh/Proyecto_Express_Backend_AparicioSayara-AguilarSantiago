// src/routes/movieRoutes.js
import express from "express";
import { addMovie, listMovies, getMovie, editMovie, removeMovie } from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// 👥 Usuarios: ver películas
router.get("/", listMovies);
router.get("/:id", getMovie);

// 🔒 Admins: gestionar películas
router.post("/", authMiddleware, authorizeRoles("admin"), addMovie);
router.put("/:id", authMiddleware, authorizeRoles("admin"), editMovie);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), removeMovie);

export default router;
