// src/models/reviewModel.js
import { getDB } from "../config/db.js";
const COLLECTION = "reseñas";

export async function createReview(data) {
  const db = getDB();
  return await db.collection(COLLECTION).insertOne(data);
}

export async function getReviewsByMovie(movieId) {
  const db = getDB();
  return await db.collection(COLLECTION).find({ idPelicula: movieId }).toArray();
}

export async function getReviewById(id) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({ _id: id });
}

export async function getUserReviewOnMovie(userId, movieId) {
  const db = getDB();
  return await db.collection(COLLECTION).findOne({
    idUsuario: userId,
    idPelicula: movieId,
  });
}

export async function updateReview(id, updateData) {
  const db = getDB();
  return await db.collection(COLLECTION).updateOne(
    { _id: id },
    { $set: updateData }
  );
}

export async function deleteReview(id) {
  const db = getDB();
  return await db.collection(COLLECTION).deleteOne({ _id: id });
}
