// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado, token requerido" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ msg: "Token inválido o expirado" });
    }
}
