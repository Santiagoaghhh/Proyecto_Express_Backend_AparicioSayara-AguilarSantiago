// src/routes/rankingRoutes.js
import express from "express";
import { getMovieRanking } from "../controllers/rankingController.js";

const router = express.Router();

// Endpoint de ranking global
router.get("/", getMovieRanking);

export default router;
