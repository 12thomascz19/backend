const express = require("express");
const router = express.Router();

// Importamos las funciones del controlador
const {
  obtenerJuegos,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} = require("../controllers/juegoController");

const auth = require("../middleware/authMiddleware"); // Middleware de autenticación

// Rutas protegidas
router.get("/", auth, obtenerJuegos);
router.post("/", auth, crearJuego);
router.put("/:id", auth, actualizarJuego);
router.delete("/:id", auth, eliminarJuego);

module.exports = router;
