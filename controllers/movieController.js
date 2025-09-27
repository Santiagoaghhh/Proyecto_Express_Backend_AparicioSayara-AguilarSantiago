// src/controllers/movieController.js
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// Crear película
export async function addMovie(req, res) {
  try {
    const { titulo, descripcion, anno, imagen, estado, tipo, idCategoria } = req.body;

    if (!titulo || !descripcion || !anno || !idCategoria) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    // 1. Validar que idCategoria sea un ObjectId válido
    if (!ObjectId.isValid(idCategoria)) {
      return res.status(400).json({ msg: "ID de categoría inválido" });
    }

    const db = getDB();
    const categoriaId = new ObjectId(idCategoria);

    // 2. Verificar que la categoría exista
    const categoria = await db.collection("categorias").findOne({ _id: categoriaId });
    if (!categoria) {
      return res.status(400).json({ msg: "La categoría no existe" });
    }

    // 3. Insertar película con idCategoria convertido a ObjectId
    const result = await db.collection("peliculas").insertOne({
      titulo,
      descripcion,
      anno,
      imagen: imagen || null,
      tipo, // movie / series / anime
      idCategoria: categoriaId,
      creadaEn: new Date(),
    });

    res.status(201).json({ msg: "✅ Película creada", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al crear película", error: error.message });
  }
}

// Listar películas (con $lookup y filtro opcional por categoría)
export async function listMovies(req, res) {
  try {
    const db = getDB();
    const { categoria } = req.query;

    const pipeline = [
      {
        $lookup: {
          from: "categorias",
          localField: "idCategoria",
          foreignField: "_id",
          as: "categoria",
        },
      },
      { $unwind: "$categoria" }, // convierte array en objeto
    ];

    // Filtrar por categoría si se pasa en query
    if (categoria) {
      pipeline.unshift({
        $match: { idCategoria: new ObjectId(categoria) },
      });
    }

    const movies = await db.collection("peliculas").aggregate(pipeline).toArray();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al obtener películas", error: error.message });
  }
}

// Obtener película por ID
export async function getMovie(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const pipeline = [
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "categorias",
          localField: "idCategoria",
          foreignField: "_id",
          as: "categoria",
        },
      },
      { $unwind: "$categoria" },
    ];

    const movie = await db.collection("peliculas").aggregate(pipeline).toArray();

    if (!movie || movie.length === 0) {
      return res.status(404).json({ msg: "Película no encontrada" });
    }

    res.json(movie[0]);
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al obtener película", error: error.message });
  }
}

// Editar película
export async function editMovie(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    // Si se quiere cambiar la categoría, validar
    if (updateData.idCategoria) {
      const categoria = await db
        .collection("categorias")
        .findOne({ _id: new ObjectId(updateData.idCategoria) });
      if (!categoria) {
        return res.status(400).json({ msg: "La categoría no existe" });
      }
      updateData.idCategoria = new ObjectId(updateData.idCategoria);
    }

    const result = await db.collection("peliculas").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Película no encontrada" });
    }

    res.json({ msg: "✅ Película actualizada" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al actualizar película", error: error.message });
  }
}

// Eliminar película
export async function removeMovie(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Película no encontrada" });
    }

    res.json({ msg: "✅ Película eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al eliminar película", error: error.message });
  }
}
