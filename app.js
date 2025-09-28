// src/app.js
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import popularityRoutes from "./routes/popularityRoutes.js";
import { swaggerDocs } from "./swagger.js";

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
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/reactions", reactionRoutes);
app.use("/api/v1/ranking", rankingRoutes);
app.use("/api/v1/popular", popularityRoutes);

swaggerDocs(app);

// Manejo de errores 
app.use((req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
});

export default app;
