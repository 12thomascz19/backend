const mongoose = require("mongoose");

const JuegoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, // 🔥 Asociamos el juego al usuario
  titulo: { type: String, required: true },
  plataforma: { type: String, required: true },
  genero: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 1, max: 5 },
  portada: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Juego", JuegoSchema);
