// src/middlewares/validateMovie.js
export function validateMovie(req, res, next) {
  const { titulo, descripcion, anno, idCategoria } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ msg: "El título es obligatorio" });
  }

  if (!descripcion || descripcion.trim() === "") {
    return res.status(400).json({ msg: "La descripción es obligatoria" });
  }

  if (!anno || isNaN(Number(anno))) {
    return res.status(400).json({ msg: "El año debe ser un número válido" });
  }

  if (!idCategoria) {
    return res.status(400).json({ msg: "Debe especificar una categoría" });
  }

  next();
}
