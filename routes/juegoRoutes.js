const express = require("express");
const router = express.Router();

// Importar funciones del controlador principal de juegos
const {
  obtenerTodosLosJuegos,
  obtenerMisJuegos,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
  agregarABiblioteca,
  obtenerBiblioteca,
} = require("../controllers/juegoController");

// Importar controlador de estadísticas (verifica que exista)
let obtenerEstadisticasUsuario;
try {
  ({ obtenerEstadisticasUsuario } = require("../controllers/estadisticasController"));
} catch (error) {
  console.warn("⚠️ No se pudo cargar el controlador de estadísticas:", error.message);
  obtenerEstadisticasUsuario = (req, res) =>
    res
      .status(501)
      .json({ message: "Controlador de estadísticas no disponible." });
}

// Middleware de autenticación
const { verificarToken } = require("../middleware/authMiddleware");

/* =========================================================
   🔹 RUTAS PÚBLICAS (sin token)
   ========================================================= */

// Obtener todos los juegos públicos
router.get("/", obtenerTodosLosJuegos);

// Crear un nuevo juego (público, visible a todos)
router.post("/", crearJuego);

/* =========================================================
   🔒 RUTAS PRIVADAS (requieren autenticación)
   ========================================================= */

// Juegos personales
router.get("/mis-juegos", verificarToken, obtenerMisJuegos);

// Estadísticas personales
router.get("/mis-estadisticas", verificarToken, obtenerEstadisticasUsuario);

// Actualizar un juego propio
router.put("/:id", verificarToken, actualizarJuego);

// Eliminar un juego propio
router.delete("/:id", verificarToken, eliminarJuego);

// 📚 Biblioteca (privada por usuario)
router.post("/agregar-a-biblioteca/:id", verificarToken, agregarABiblioteca);
router.get("/mi-biblioteca", verificarToken, obtenerBiblioteca);

module.exports = router;
