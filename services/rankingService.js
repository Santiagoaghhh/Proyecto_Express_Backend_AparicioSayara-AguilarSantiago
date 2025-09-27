// src/services/rankingService.js
import { getDB } from "../config/db.js";

export async function calcularRankingPeliculas() {
  const db = getDB();

  const pipeline = [
    {
      $lookup: {
        from: "resennas",
        localField: "_id",
        foreignField: "idPelicula",
        as: "reseñas"
      }
    },
    {
      $addFields: {
        promedioRating: { $avg: "$reseñas.rating" },
        totalReseñas: { $size: "$reseñas" }
      }
    },
    {
      $sort: { promedioRating: -1 }   
    }
  ];

  const result = await db.collection("peliculas").aggregate(pipeline).toArray();

  // Limpiar salida para frontend
  return result.map((pelicula) => ({
    _id: pelicula._id,
    titulo: pelicula.titulo,
    anno: pelicula.anno,
    categoria: pelicula.categoria,
    promedioRating: pelicula.promedioRating
      ? Number(pelicula.promedioRating.toFixed(1))
      : null,
    totalReseñas: pelicula.totalReseñas
  }));
}
