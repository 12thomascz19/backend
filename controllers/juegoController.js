const Juego = require("../models/Juego");
const Usuario = require("../models/Usuario");
const mongoose = require("mongoose");

/**
 * Obtener todos los juegos públicos
 * GET /api/juegos
 */
exports.obtenerTodosLosJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ fechaCreacion: -1 });
    res.json(juegos);
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

/**
 * Obtener biblioteca del usuario autenticado
 * GET /api/juegos/mi-biblioteca
 */
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
    return res.status(500).json({ message: "Error al obtener la biblioteca" });
  }
};

/**
 * Obtener juegos del usuario autenticado
 * GET /api/juegos/mis-juegos
 */
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

/**
 * Crear un nuevo juego público
 * POST /api/juegos
 */
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

/**
 * Actualizar un juego existente
 * PUT /api/juegos/:id
 */
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

/**
 * Eliminar un juego existente
 * DELETE /api/juegos/:id
 */
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

/**
 * Agregar un juego existente a la biblioteca del usuario
 * POST /api/juegos/agregar-a-biblioteca/:id
 */
exports.agregarABiblioteca = async (req, res) => {
  try {
    const userId = req.usuario?.id;
    let juegoId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    if (!juegoId) {
      return res.status(400).json({ message: "Falta id de juego." });
    }

    juegoId = juegoId.trim();

    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({
        message: "ID de juego inválido. Debe ser un ObjectId válido.",
        idRecibido: juegoId,
        ejemploValido: "507f1f77bcf86cd799439011",
      });
    }

    const juegoObjectId = new mongoose.Types.ObjectId(juegoId);

    const juego = await Juego.findById(juegoObjectId);
    if (!juego) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!Array.isArray(usuario.biblioteca)) {
      usuario.biblioteca = [];
    }

    const already = usuario.biblioteca
      .map(String)
      .includes(String(juegoObjectId));
    if (already) {
      return res
        .status(400)
        .json({ message: "El juego ya está en tu biblioteca" });
    }

    usuario.biblioteca.push(juegoObjectId);
    await usuario.save();

    return res.status(200).json({
      message: "Juego agregado a tu biblioteca",
      biblioteca: usuario.biblioteca,
      juegoAgregado: {
        _id: juego._id,
        titulo: juego.titulo,
      },
    });
  } catch (error) {
    console.error("Error al agregar a biblioteca:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Función para quitar un juego de la biblioteca
exports.quitarDeBiblioteca = async (req, res) => {
  try {
    const userId = req.usuario?.id;
    let juegoId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    if (!juegoId) {
      return res.status(400).json({ message: "Falta id de juego." });
    }

    juegoId = juegoId.trim();

    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({
        message: "ID de juego inválido. Debe ser un ObjectId válido.",
        idRecibido: juegoId,
        ejemploValido: "507f1f77bcf86cd799439011",
      });
    }

    const juegoObjectId = new mongoose.Types.ObjectId(juegoId);

    const juego = await Juego.findById(juegoObjectId);
    if (!juego) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!Array.isArray(usuario.biblioteca)) {
      usuario.biblioteca = [];
    }

    const index = usuario.biblioteca.map(String).indexOf(String(juegoObjectId));
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "El juego no está en tu biblioteca" });
    }

    // Eliminar juego de la biblioteca
    usuario.biblioteca.splice(index, 1);
    await usuario.save();

    return res.status(200).json({
      message: "Juego eliminado de tu biblioteca",
      biblioteca: usuario.biblioteca,
      juegoEliminado: {
        _id: juego._id,
        titulo: juego.titulo,
      },
    });
  } catch (error) {
    console.error("Error al quitar de biblioteca:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
