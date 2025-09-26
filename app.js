// src/app.js
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas peticiones, intenta más tarde",
}));

// Rutas
app.get("/", (req, res) => {
  res.json({ msg: "🚀 Bienvenido a la API de KarenFlix" });
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);

export default app;
