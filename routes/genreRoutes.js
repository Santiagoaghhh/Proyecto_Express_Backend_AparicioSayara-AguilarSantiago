// src/routes/genreRoutes.js
import express from "express";
import { addGenre, listGenres, editGenre, removeGenre} from "../controllers/genreController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Usuarios: pueden ver
router.get("/", listGenres);

// Admins: CRUD
router.post("/", authMiddleware, authorizeRoles("admin"), addGenre);
router.put("/:id", authMiddleware, authorizeRoles("admin"), editGenre);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), removeGenre);

export default router;
        