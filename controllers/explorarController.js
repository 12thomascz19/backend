const Juego = require("../models/Juego");

// 📥 Obtener todos los juegos públicos
exports.obtenerJuegosPublicos = async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ fechaCreacion: -1 });
    res.status(200).json(juegos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos públicos" });
  }
};

// ➕ Crear nuevo juego (visible para todos)
exports.crearJuegoPublico = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el juego público", error });
  }
};
