// src/middleware/roleMiddleware.js
export default function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ msg: "Acceso denegado: rol no autorizado" });
    }
    next();
  };
}
  