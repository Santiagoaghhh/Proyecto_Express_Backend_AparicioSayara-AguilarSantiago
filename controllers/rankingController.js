// src/controllers/rankingController.js
import { calcularRankingPeliculas } from "../services/rankingService.js";

export async function getMovieRanking(req, res) {
  try {
    const ranking = await calcularRankingPeliculas();
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al calcular ranking", error: error.message });
  }
}
