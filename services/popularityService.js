import { getDB } from "../config/db.js";

export async function calcularPeliculasPopulares(limit = 10) {
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
    { $unwind: { path: "$reseñas", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "reacciones",
        localField: "reseñas._id",
        foreignField: "idResenna",
        as: "reacciones"
      }
    },
    {
      $addFields: {
        likes: {
          $size: {
            $filter: { input: "$reacciones", as: "r", cond: { $eq: ["$$r.tipo", "like"] } }
          }
        },
        dislikes: {
          $size: {
            $filter: { input: "$reacciones", as: "r", cond: { $eq: ["$$r.tipo", "dislike"] } }
          }
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        titulo: { $first: "$titulo" },
        anno: { $first: "$anno" },
        categoria: { $first: "$idCategoria" },
        imagen: { $first: "$imagen" },        // ✅ Incluimos la imagen
        descripcion: { $first: "$descripcion" }, // ✅ Y la descripción
        totalLikes: { $sum: "$likes" },
        totalDislikes: { $sum: "$dislikes" }
      }
    },
    { $addFields: { popularidad: { $subtract: ["$totalLikes", "$totalDislikes"] } } },
    { $sort: { popularidad: -1 } },
    { $limit: limit }
  ];

  return await db.collection("peliculas").aggregate(pipeline).toArray();
}
