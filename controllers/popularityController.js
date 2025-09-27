// src/controllers/popularityController.js
import { calcularPeliculasPopulares } from "../services/popularityService.js";

export async function getPopularMovies(req, res) {
  try {
    const populares = await calcularPeliculasPopulares();
    res.json(populares);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al calcular popularidad", error: error.message });
  }
}
