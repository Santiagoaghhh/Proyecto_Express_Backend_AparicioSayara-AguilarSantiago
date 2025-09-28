// src/middlewares/validateReview.js
export function validateReview(req, res, next) {
  const { titulo, comentario, rating } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ msg: "El título de la reseña es obligatorio" });
  }

  if (!comentario || comentario.trim() === "") {
    return res.status(400).json({ msg: "El comentario es obligatorio" });
  }

  if (!rating || isNaN(Number(rating)) || rating < 1 || rating > 5) {
    return res.status(400).json({ msg: "El rating debe estar entre 1 y 5" });
  }

  next();
}
