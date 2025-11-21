const Juego = require("../models/Juego");
const Usuario = require("../models/Usuario");
const mongoose = require("mongoose");

// 🔹 Obtener todos los juegos (público)
exports.obtenerTodosLosJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ fechaCreacion: -1 });
    res.json(juegos);
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

// 🔹 Obtener biblioteca del usuario autenticado
exports.obtenerBiblioteca = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const usuario = await Usuario.findById(usuarioId)
      .populate({
        path: "biblioteca",
        options: { sort: { fechaCreacion: -1 } },
      })
      .lean();

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const biblioteca = Array.isArray(usuario.biblioteca)
      ? usuario.biblioteca
      : [];

    return res.json({
      message: "Biblioteca obtenida exitosamente",
      biblioteca,
    });
  } catch (error) {
    console.error("Error al obtener biblioteca:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener la biblioteca" });
  }
};

// 🔹 Obtener juegos del usuario autenticado
exports.obtenerMisJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find({ usuarioId: req.usuario.id });
    res.json(juegos);
  } catch (error) {
    console.error("Error al obtener los juegos del usuario:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los juegos del usuario" });
  }
};

// 🔹 Crear un nuevo juego (público)
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego({
      titulo: req.body.titulo,
      genero: req.body.genero,
      plataforma: req.body.plataforma,
      añoLanzamiento: req.body.añoLanzamiento,
      desarrollador: req.body.desarrollador,
      imagenPortada: req.body.imagenPortada,
      descripcion: req.body.descripcion,
      completado: req.body.completado || false,
    });

    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error("Error al crear juego:", error);
    res.status(400).json({ message: "Error al crear juego", error });
  }
};

// 🔹 Actualizar juego (solo autenticado)
exports.actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!juegoActualizado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json(juegoActualizado);
  } catch (error) {
    console.error("Error al actualizar juego:", error);
    res.status(400).json({ message: "Error al actualizar juego" });
  }
};

// 🔹 Eliminar juego (solo autenticado)
exports.eliminarJuego = async (req, res) => {
  try {
    const eliminado = await Juego.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar juego:", error);
    res.status(400).json({ message: "Error al eliminar juego" });
  }
};

// Agregar un juego existente a la biblioteca del usuario
exports.agregarJuegoABiblioteca = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const juegoId = req.params.id;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verificamos si ya está en su biblioteca
    if (usuario.biblioteca.includes(juegoId)) {
      return res
        .status(400)
        .json({ message: "El juego ya está en tu biblioteca" });
    }

    usuario.biblioteca.push(juegoId);
    await usuario.save();

    res
      .status(200)
      .json({ message: "Juego agregado a la biblioteca exitosamente" });
  } catch (error) {
    console.error("Error al agregar a biblioteca:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Agregar juego a la biblioteca del usuario
exports.agregarABiblioteca = async (req, res) => {
  try {
    console.log("POST /api/juegos/agregar-a-biblioteca/:id called");
    console.log("req.params:", req.params);
    console.log("req.usuario (from middleware):", req.usuario);

    const userId = req.usuario && req.usuario.id;
    let juegoId = req.params.id;

    if (!userId) {
      console.error("No hay userId en req.usuario");
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    if (!juegoId) {
      console.error("No se recibió id de juego");
      return res.status(400).json({ message: "Falta id de juego." });
    }

    // Limpiar y validar el ID del juego
    juegoId = juegoId.trim();
    console.log("🎮 ID de juego recibido:", juegoId);

    // Verificar si es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      console.error("❌ ID de juego inválido:", juegoId);
      return res.status(400).json({ 
        message: "ID de juego inválido. El formato debe ser un ObjectId de MongoDB válido.",
        idRecibido: juegoId,
        ejemploValido: "507f1f77bcf86cd799439011"
      });
    }

    // Convertir a ObjectId
    const juegoObjectId = new mongoose.Types.ObjectId(juegoId);
    console.log("✅ ObjectId convertido:", juegoObjectId);

    // Buscar juego
    const juego = await Juego.findById(juegoObjectId);
    if (!juego) {
      console.warn("⚠️ Juego no encontrado id:", juegoId);
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    // Buscar usuario
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      console.warn("⚠️ Usuario no encontrado id:", userId);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Asegurar que biblioteca sea array
    if (!Array.isArray(usuario.biblioteca)) {
      console.log("📚 Inicializando biblioteca como array vacío");
      usuario.biblioteca = [];
    }

    // Evitar duplicados (comparar strings)
    const already = usuario.biblioteca.map(String).includes(String(juegoObjectId));
    if (already) {
      console.log("📚 Juego ya existe en biblioteca:", juegoId);
      return res
        .status(400)
        .json({ message: "El juego ya está en tu biblioteca" });
    }

    // Agregar juego a la biblioteca
    usuario.biblioteca.push(juegoObjectId);
    await usuario.save();

    console.log(
      "✅ Juego agregado correctamente. Usuario:",
      usuario._id.toString(),
      "Juego:", juegoId
    );
    
    return res
      .status(200)
      .json({
        message: "Juego agregado a tu biblioteca",
        biblioteca: usuario.biblioteca,
        juegoAgregado: {
          _id: juego._id,
          titulo: juego.titulo
        }
      });
  } catch (error) {
    console.error("❌ Error interno al agregar a biblioteca:", error);
    console.error("Stack trace:", error.stack);
    return res
      .status(500)
      .json({ 
        message: "Error interno del servidor", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
  }
};
