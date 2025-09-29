// src/controllers/genreController.js
import {
    createGenre,
    getGenres,
    updateGenre,
    deleteGenre,
  } from "../models/genreModel.js";
  import { ObjectId } from "mongodb";
  
  export async function addGenre(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      if (!nombre) {
        return res.status(400).json({ msg: "El nombre del género es obligatorio" });
      }
  
      const result = await createGenre({ nombre, descripcion });
      res.status(201).json({ msg: "✅ Género creado", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ msg: "❌ Error al crear género", error: error.message });
    }
  }
  
  export async function listGenres(req, res) {
    try {
      const genres = await getGenres();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ msg: "❌ Error al obtener géneros", error: error.message });
    }
  }
  
  export async function editGenre(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const result = await updateGenre(new ObjectId(id), updateData);
      if (result.matchedCount === 0) {
        return res.status(404).json({ msg: "Género no encontrado" });
      }
  
      res.json({ msg: "✅ Género actualizado" });
    } catch (error) {
      res.status(500).json({ msg: "❌ Error al actualizar género", error: error.message });
    }
  }
  
  export async function removeGenre(req, res) {
    try {
      const { id } = req.params;
      const result = await deleteGenre(new ObjectId(id));
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: "Género no encontrado" });
      }
  
      res.json({ msg: "✅ Género eliminado" });
    } catch (error) {
      res.status(500).json({ msg: "❌ Error al eliminar género", error: error.message });
    }
  }
  