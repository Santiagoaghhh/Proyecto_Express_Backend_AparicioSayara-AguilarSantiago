// src/models/reactionModel.js
import { getDB } from "../config/db.js";
const COLLECTION = "reacciones";

export async function findReaction(idReseña, idUsuario) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({ idReseña, idUsuario });
}

export async function addReaction(data) {
  const db = getDB();
  return await db.collection(COLLECTION).insertOne(data);
}

export async function updateReaction(idReseña, idUsuario, tipo) {
  const db = getDB();
  return await db.collection(COLLECTION).updateOne(
    { idReseña, idUsuario },
    { $set: { tipo, fecha: new Date() } }
  );
}

export async function removeReaction(idReseña, idUsuario) {
  const db = getDB();
  return await db.collection(COLLECTION).deleteOne({ idReseña, idUsuario });
}

export async function countReactions(idReseña) {
  const db = getDB();
  return await db
    .collection(COLLECTION)
    .aggregate([
      { $match: { idReseña } },
      {
        $group: {
          _id: "$tipo",
          total: { $sum: 1 }
        }
      }
    ])
    .toArray();
}
