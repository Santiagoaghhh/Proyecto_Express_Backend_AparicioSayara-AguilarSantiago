import { obtenerHistorial } from "../models/historialModel.js";

export async function getHistorial(req, res) {
  try {
    const { tipoAccion, desde, hasta } = req.query;

    const historial = await obtenerHistorial(req.user.id, {
      tipoAccion,
      desde,
      hasta,
    });

    res.status(200).json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ message: "Error al obtener historial" });
  }
}
