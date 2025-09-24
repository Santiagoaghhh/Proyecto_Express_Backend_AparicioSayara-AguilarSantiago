import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT;
let client;
let db;


export async function connectDB() {
  if (db) return db;
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Conectado correctamente");
    db = client.db(); 
    return db;
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
}

export function getDB() {
  if (!db) throw new Error("No hay conexión activa a la BD");
  return db;
}
