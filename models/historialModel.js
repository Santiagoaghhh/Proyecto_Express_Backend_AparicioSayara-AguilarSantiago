// src/models/historialModel.js
import { getDB } from "../config/db.js";

const COLLECTION = "historial";

/**
 * Registrar una acción en el historial de un usuario
 * @param {string|ObjectId} usuarioId - ID del usuario
 * @param {string} tipoAccion - Tipo de acción: "registro", "editar", "eliminar"
 * @param {string} descripcion - Descripción de la acción
 */
export async function registrarAccion(usuarioId, tipoAccion, descripcion) {
  try {
    const db = getDB();
    const historial = {
      usuarioId,
      tipoAccion,
      descripcion,
      fecha: new Date(),
    };
    await db.collection(COLLECTION).insertOne(historial);
  } catch (error) {
    console.error("❌ Error al registrar historial:", error.message);
  }
}

/**
 * Obtener historial de un usuario con filtros
 * @param {string|ObjectId} usuarioId - ID del usuario
 * @param {object} filtros - { tipoAccion, desde, hasta }
 * @returns {Promise<Array>} Lista de acciones ordenadas por fecha
 */
export async function obtenerHistorial(usuarioId, filtros = {}) {
  const db = getDB();
  const query = { usuarioId };

  if (filtros.tipoAccion) {
    query.tipoAccion = filtros.tipoAccion;
  }

  if (filtros.desde || filtros.hasta) {
    query.fecha = {};
    if (filtros.desde) query.fecha.$gte = new Date(filtros.desde);
    if (filtros.hasta) query.fecha.$lte = new Date(filtros.hasta);
  }

  return db.collection(COLLECTION)
           .find(query)
           .sort({ fecha: -1 })
           .toArray();
}
