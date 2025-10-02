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

app.post('/review', verificarAutenticacion, async (req, res) => {
  try {
    const addReview = new reseña({
      texto: req.body.texto,
      usuarioId: req.usuarioId
    });
    await nuevaReseña.save();

    const historial = new Historial({
      usuarioId: req.usuarioId,
      tipoAccion: 'registro',
      descripcion: `Se ha registrado una nueva reseña.`,
    });
    await historial.save();

    res.status(201).json({ message: 'Reseña registrada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la reseña' });
  }
});


app.get('/historial', verificarAutenticacion, async (req, res) => {
  try {
    const { tipoAccion, desde, hasta } = req.query;

    const filtro = { usuarioId: req.usuarioId };

    if (tipoAccion) {
      filtro.tipoAccion = tipoAccion;
    }

    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }

    // filtrar el historial
    const historial = await Historial.find(filtro)
      .sort({ fecha: -1 }) // buscar por fecha
      .exec();

    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial' });
  }
});

// Manejo de errores 
app.use((req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
});

export default app;
