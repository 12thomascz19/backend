const mongoose = require("mongoose");

// Esquema para reseñas
const ReseñaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego" },
  usuario: { type: String, required: true },
  texto: { type: String, required: true },
  estrellas: { type: Number, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reseña", ReseñaSchema);
