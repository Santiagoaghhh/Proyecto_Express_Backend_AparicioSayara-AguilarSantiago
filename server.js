// src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
  }
}

startServer();
