const express = require("express");
const router = express.Router();
const {
  obtenerJuegosPublicos,
  crearJuegoPublico,
} = require("../controllers/explorarController");

// Ruta pública para ver todos los juegos
router.get("/", obtenerJuegosPublicos);

// Ruta pública para crear uno nuevo
router.post("/", crearJuegoPublico);

module.exports = router;
