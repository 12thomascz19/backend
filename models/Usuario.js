// 📁 models/Usuario.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    descripcion: { type: String, default: "" },
    fotoPerfil: { type: String, default: "" },
    biblioteca: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Juego",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
