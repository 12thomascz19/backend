const mongoose = require("mongoose");

// Esquema para las reseñas de juegos
const reseñaSchema = new mongoose.Schema({
  // Usuario que realizó la reseña (referencia al modelo Usuario)
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

  // Juego al que pertenece la reseña (referencia al modelo Juego)
  juego: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Juego",
    required: true,
  },

  // Comentario escrito por el usuario
  comentario: {
    type: String,
    required: true,
    trim: true, // Elimina espacios al inicio y final
  },

  // Puntuación del juego (1 a 5)
  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },

  // Horas jugadas por el usuario
  horasJugadas: {
    type: Number,
    required: true,
  },

  // Nivel de dificultad del juego según el usuario
  dificultad: {
    type: String,
    enum: ["Fácil", "Normal", "Difícil"], // Solo estos valores permitidos
    required: true,
  },

  // Indica si el usuario recomendaría el juego
  recomendaria: {
    type: Boolean,
    required: true,
  },

  // Fecha de creación de la reseña
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Exportar el modelo para usarlo en controladores y rutas
module.exports = mongoose.model("Reseña", reseñaSchema);
