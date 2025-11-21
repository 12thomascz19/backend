const Reseña = require("../models/Resena");
const Juego = require("../models/Juego");

// Crear reseña
exports.crearResena = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const {
      juegoId,
      textoReseña,
      puntuacion,
      horasJugadas,
      dificultad,
      recomendaria,
    } = req.body;

    if (
      !juegoId ||
      !textoReseña ||
      !puntuacion ||
      !horasJugadas ||
      !dificultad ||
      recomendaria === undefined
    ) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const nuevaResena = new Reseña({
      usuario: usuarioId,
      juego: juegoId,
      comentario: textoReseña,
      puntuacion,
      horasJugadas,
      dificultad,
      recomendaria,
      fechaCreacion: new Date(),
    });

    await nuevaResena.save();

    res.status(201).json({
      msg: "Reseña creada correctamente",
      reseña: nuevaResena,
    });
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// Obtener reseñas de un juego
exports.obtenerResenasPorJuego = async (req, res) => {
  try {
    const { juegoId } = req.params;

    const reseñas = await Reseña.find({ juego: juegoId })
      .populate("usuario", "nombre email fotoPerfil")
      .populate("juego", "titulo imagenPortada");

    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error al obtener reseñas." });
  }
};

// Obtener reseñas del usuario
exports.obtenerMisResenas = async (req, res) => {
  try {
    const reseñas = await Reseña.find({ usuario: req.usuario.id }).populate(
      "juego",
      "titulo imagenPortada"
    );

    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener mis reseñas:", error);
    res.status(500).json({ message: "Error al obtener mis reseñas." });
  }
};

// Actualizar reseña
exports.actualizarResena = async (req, res) => {
  try {
    const resenaId = req.params.id;

    let reseña = await Reseña.findById(resenaId);

    if (!reseña) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    if (reseña.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ message: "No puedes editar esta reseña" });
    }

    const datos = req.body;
    datos.fechaActualizacion = new Date();

    reseña = await Reseña.findByIdAndUpdate(resenaId, datos, { new: true });

    res.json({ message: "Reseña actualizada", reseña });
  } catch (error) {
    console.error("Error al actualizar reseña:", error);
    res.status(500).json({ message: "Error al actualizar." });
  }
};

// Eliminar reseña
exports.eliminarResena = async (req, res) => {
  try {
    const resenaId = req.params.id;

    const reseña = await Reseña.findById(resenaId);

    if (!reseña) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    if (reseña.usuario.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ message: "No puedes eliminar esta reseña" });
    }

    await reseña.deleteOne();

    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener TODAS las reseñas
exports.obtenerResenas = async (req, res) => {
  try {
    const reseñas = await Reseña.find()
      .populate("usuario", "nombre fotoPerfil")
      .populate("juego", "titulo imagenPortada");

    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
