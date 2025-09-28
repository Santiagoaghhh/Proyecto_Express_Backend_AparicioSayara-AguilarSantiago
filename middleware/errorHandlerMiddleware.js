// src/middlewares/errorHandler.js
export function errorHandler(err, req, res, next) {
  console.error("❌ Error en:", req.method, req.originalUrl);
  console.error("Detalles:", err.stack);

  if (res.headersSent) {
    return next(err);
  }

  // Si es un error de validación
  if (err.name === "ValidationError") {
    return res.status(400).json({ msg: err.message });
  }

  // Si es un error de permisos
  if (err.name === "UnauthorizedError") {
    return res.status(403).json({ msg: "Acceso denegado" });
  }

  // Error genérico
  res.status(500).json({ msg: "Error interno del servidor" });
}
