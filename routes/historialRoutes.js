// src/routes/historialRoutes.js
import express from "express";
import { getHistorial } from "../controllers/historialController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getHistorial);

export default router;
