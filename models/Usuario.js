const mongoose = require("mongoose");

// Esquema para los usuarios
const usuarioSchema = new mongoose.Schema(
  {
    // Nombre completo del usuario (requerido)
    nombre: { type: String, required: true },

    // Correo electrónico único (requerido)
    email: { type: String, required: true, unique: true },

    // Contraseña encriptada (requerido)
    password: { type: String, required: true },

    // Descripción o biografía del usuario (opcional, por defecto vacío)
    descripcion: { type: String, default: "" },

    // URL de la foto de perfil del usuario (opcional, por defecto vacío)
    fotoPerfil: { type: String, default: "" },

    // Biblioteca de juegos del usuario: lista de referencias a documentos de la colección "Juego"
    biblioteca: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Juego", // Relación con el modelo Juego
      },
    ],
  },
  {
    // Añade automáticamente campos createdAt y updatedAt
    timestamps: true,
  }
);

// Exportar el modelo para poder usarlo en controladores y rutas
module.exports = mongoose.model("Usuario", usuarioSchema);
