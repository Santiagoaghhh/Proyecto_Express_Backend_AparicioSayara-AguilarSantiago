// src/routes/popularityRoutes.js
import express from "express";
import { getPopularMovies } from "../controllers/popularityController.js";

const router = express.Router();

// Endpoint de películas populares
router.get("/", getPopularMovies);

export default router;
