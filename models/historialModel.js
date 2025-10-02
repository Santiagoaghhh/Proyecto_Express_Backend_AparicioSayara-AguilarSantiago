import { getDB } from "../config/db.js";
const mongodb = require('mongodb');

const COLLECTION = "historial";

const historialSchema = new mongodb.Schema({
  userId: {
    type: mongodb.Schema.Types.ObjectId,
    ref: 'idUsuario',
    required: true
  },
  tipoAccion: { 
    type: String,
    enum: ['registro', 'edicion', 'eliminacion'],
    required: true
  },
  descripcion: { 
    type: String,
    required: true 
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const db = getDB();

const Historial = mongodb.model('Historial', historialSchema);
module.exports = Historial;
