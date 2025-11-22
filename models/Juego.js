// 📁 models/Juego.js
const mongoose = require("mongoose");

// Esquema para los juegos
const JuegoSchema = new mongoose.Schema(
  {
    // Título del juego
    titulo: {
      type: String,
      required: true,
      trim: true, // Elimina espacios al inicio y final
    },

    // Género del juego (Acción, RPG, Aventura, etc.)
    genero: {
      type: String,
      required: true,
    },

    // Plataforma en la que está disponible el juego
    plataforma: {
      type: String,
      required: true,
    },

    // Año de lanzamiento
    añoLanzamiento: {
      type: Number,
      required: true,
    },

    // Nombre del desarrollador
    desarrollador: {
      type: String,
      required: true,
    },

    // URL de la imagen de portada
    imagenPortada: {
      type: String,
      required: true,
    },

    // Descripción del juego
    descripcion: {
      type: String,
      required: true,
    },

    // Indica si el usuario completó el juego
    completado: {
      type: Boolean,
      default: false,
    },

    // Fecha de creación del registro
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "juegos", // Nombre de la colección en MongoDB
  }
);

// Exportar el modelo para usarlo en controladores y rutas
module.exports = mongoose.model("Juego", JuegoSchema);
