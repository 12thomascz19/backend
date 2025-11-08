const Juego = require("../models/Juego");

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
