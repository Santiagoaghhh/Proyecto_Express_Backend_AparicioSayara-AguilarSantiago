import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

async function importCatalog() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // Leer catálogo.json
    const data = JSON.parse(fs.readFileSync("./catalogo.json", "utf8"));

    for (const pelicula of data) {
      const {
        title,
        overview,
        year,
        poster,
        categoria, // tipo de contenido: movie / series / anime
        genres,    // array de géneros
      } = pelicula;

      // Usar el primer género si existe, sino asignar "Sin categoría"
      const genero =
        Array.isArray(genres) && genres.length > 0
          ? genres[0].trim()
          : "Sin categoría";

      // Buscar categoría en DB
      let categoriaDoc = await db.collection("categorias").findOne({
        nombreCategoria: genero,
      });

      // Crear categoría si no existe
      if (!categoriaDoc) {
        const nuevaCat = await db.collection("categorias").insertOne({
          nombreCategoria: genero,
          descripcion: `Categoría generada automáticamente desde catálogo`,
          creadoEn: new Date(),
        });
        categoriaDoc = { _id: nuevaCat.insertedId, nombreCategoria: genero };
        console.log(`➕ Creada categoría: ${genero}`);
      }

      // Insertar película con FK a categoría
      await db.collection("peliculas").insertOne({
        titulo: title,
        descripcion: overview,
        anno: year,
        imagen: poster,
        estado: "pendiente",
        tipo: categoria, // tipo de contenido (movie/series/anime)
        idCategoria: new ObjectId(categoriaDoc._id), // FK a categorías
        creadaEn: new Date(),
      });

      console.log(`🎬 Insertada película: ${title}`);
    }

    console.log("✅ Catálogo importado con éxito");
  } catch (err) {
    console.error("❌ Error al importar catálogo:", err.message);
  } finally {
    await client.close();
  }
}

importCatalog();
