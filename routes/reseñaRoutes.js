const express = require("express");
const router = express.Router();
const {
  obtenerReseñas,
  crearReseña,
  actualizarReseña,
  eliminarReseña,
} = require("../controllers/reseñaController");

// Ruta: /api/reseñas
router.get("/", obtenerReseñas);
router.post("/", crearReseña);
router.put("/:id", actualizarReseña);
router.delete("/:id", eliminarReseña);

module.exports = router;
