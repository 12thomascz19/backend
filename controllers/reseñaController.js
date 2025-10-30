const Reseña = require("../models/Reseña");

// Obtener todas las reseñas
exports.obtenerReseñas = async (req, res) => {
  try {
    const reseñas = await Reseña.find().populate("juegoId");
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};

// Crear reseña
exports.crearReseña = async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(400).json({ message: "Error al crear reseña", error });
  }
};

// Actualizar reseña
exports.actualizarReseña = async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar reseña" });
  }
};

// Eliminar reseña
exports.eliminarReseña = async (req, res) => {
  try {
    await Reseña.findByIdAndDelete(req.params.id);
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar reseña" });
  }
};
