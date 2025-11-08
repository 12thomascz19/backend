const express = require("express");
const router = express.Router();

// Importar funciones del controlador
const {
  obtenerTodosLosJuegos,
  obtenerMisJuegos,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} = require("../controllers/juegoController");
const { obtenerEstadisticasUsuario } = require("../controllers/estadisticasController");


// Importar middleware de autenticación
const { verificarToken } = require("../middleware/authMiddleware");

/* =========================================================
   🔹 RUTAS PÚBLICAS (sin token)
   ========================================================= */

// Obtener todos los juegos (Explorar Juegos)
router.get("/", obtenerTodosLosJuegos);

// Crear un nuevo juego público (para que todos puedan agregar)
router.post("/", crearJuego);

/* =========================================================
   🔒 RUTAS PRIVADAS (requieren autenticación)
   ========================================================= */

// Obtener juegos del usuario autenticado
router.get("/mis-juegos", verificarToken, obtenerMisJuegos);
router.get("/mis-estadisticas", verificarToken, obtenerEstadisticasUsuario);


// Actualizar juego (solo si el usuario tiene sesión)
router.put("/:id", verificarToken, actualizarJuego);

// Eliminar juego (solo si el usuario tiene sesión)
router.delete("/:id", verificarToken, eliminarJuego);

module.exports = router;
