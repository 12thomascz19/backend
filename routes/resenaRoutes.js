const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");

const {
  crearResena,
  obtenerResenasPorJuego,
  obtenerMisResenas,
  actualizarResena,
  eliminarResena,
  obtenerResenas,
} = require("../controllers/resenaController");

// Crear reseña
router.post("/", verificarToken, crearResena);

router.get("/", obtenerResenas);

// Obtener reseñas de un juego
router.get("/juego/:juegoId", obtenerResenasPorJuego);

// Obtener mis reseñas
router.get("/mis-resenas", verificarToken, obtenerMisResenas);

// Actualizar reseña
router.put("/:id", verificarToken, actualizarResena);

// Eliminar reseña
router.delete("/:id", verificarToken, eliminarResena);

module.exports = router;
