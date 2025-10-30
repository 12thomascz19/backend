const Juego = require("../models/Juego");

// Obtener juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find({ usuarioId: req.usuario.id });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

// Crear juego
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego({
      ...req.body,
      usuarioId: req.usuario.id,
    });
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: "Error al crear juego", error });
  }
};

// Actualizar juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar juego" });
  }
};

// Eliminar juego
exports.eliminarJuego = async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar juego" });
  }
};
