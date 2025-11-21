const mongoose = require("mongoose");

const reseñaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

  juego: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Juego",
    required: true,
  },

  comentario: {
    type: String,
    required: true,
    trim: true,
  },

  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },

  horasJugadas: {
    type: Number,
    required: true,
  },

  dificultad: {
    type: String,
    enum: ["Fácil", "Normal", "Difícil"],
    required: true,
  },

  recomendaria: {
    type: Boolean,
    required: true,
  },

  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reseña", reseñaSchema);
