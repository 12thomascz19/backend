const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");
const { obtenerEstadisticasUsuario } = require("../controllers/estadisticasController");

// Solo el usuario autenticado puede ver sus estadísticas
router.get("/mis-estadisticas", verificarToken, obtenerEstadisticasUsuario);

module.exports = router;
