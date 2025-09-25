// src/app.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config()

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 min
        max: 100,
        message: "Demasiadas peticiones, intenta más tarde",
    })
);

// Pruebita
app.get("/", (req, res) => {
    res.json({ msg: "🚀 Bienvenido a la API de KarenFlix" });
});

// Conectar a Mongo
connectDB();
// API
app.use("/api/v1/users", userRoutes);

export default app;



