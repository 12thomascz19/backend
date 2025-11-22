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
  quitarDeBiblioteca
} = require("../controllers/juegoController");

// Importar controlador de estadísticas (verifica que exista)
let obtenerEstadisticasUsuario;
try {
  ({ obtenerEstadisticasUsuario } = require("../controllers/estadisticasController"));
} catch (error) {
  console.warn("No se pudo cargar el controlador de estadísticas:", error.message);
  // Si no existe el controlador, se retorna un mensaje de error
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

// Obtener todos los juegos disponibles públicamente
// GET /api/juegos/
router.get("/", obtenerTodosLosJuegos);

// Crear un nuevo juego (opcionalmente público)
// POST /api/juegos/
router.post("/", crearJuego);

/* =========================================================
   RUTAS PRIVADAS (requieren autenticación)
   ========================================================= */

// Obtener los juegos del usuario autenticado
// GET /api/juegos/mis-juegos
router.get("/mis-juegos", verificarToken, obtenerMisJuegos);

// Obtener estadísticas personales del usuario
// GET /api/juegos/mis-estadisticas
router.get("/mis-estadisticas", verificarToken, obtenerEstadisticasUsuario);

// Actualizar un juego propio
// PUT /api/juegos/:id
router.put("/:id", verificarToken, actualizarJuego);

// Eliminar un juego propio
// DELETE /api/juegos/:id
router.delete("/:id", verificarToken, eliminarJuego);

// Agregar un juego a la biblioteca personal
// POST /api/juegos/agregar-a-biblioteca/:id
router.post("/agregar-a-biblioteca/:id", verificarToken, agregarABiblioteca);

// quitar un juego de biblioteca personal
// POST /api/juegos/quitar-de-biblioteca
router.delete("/quitar-de-biblioteca/:id", verificarToken, quitarDeBiblioteca);

// Obtener la biblioteca del usuario autenticado
// GET /api/juegos/mi-biblioteca/:id
router.get("/mi-biblioteca", verificarToken, obtenerBiblioteca);

module.exports = router;
// Exportamos el router para integrarlo en app.js o server.js
