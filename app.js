// src/app.js
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/loginRoutes.js"; // Importa tus rutas

const app = express();

// Configuración de middlewares
app.use(express.json()); // Para procesar JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios

// Middleware para limitar las peticiones
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Demasiadas peticiones desde esta IP, por favor intentalo de nuevo despues de 15 minutos"
});
app.use(limiter);

// Configuración de CORS
app.use(
    cors({
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

// Registrar rutas
app.use("/api/auth", authRoutes); // Usa un prefijo para tus rutas, por ejemplo /api/auth

export default app;