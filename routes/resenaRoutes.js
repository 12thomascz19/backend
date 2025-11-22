const express = require("express");
const router = express.Router();
// Creamos un router de Express para definir rutas específicas de reseñas

const { verificarToken } = require("../middleware/authMiddleware");
// Middleware que verifica que el usuario esté autenticado

const {
  crearResena,
  obtenerResenasPorJuego,
  obtenerMisResenas,
  actualizarResena,
  eliminarResena,
  obtenerResenas,
} = require("../controllers/resenaController");
// Controladores que contienen la lógica de cada acción sobre reseñas

// ----------------------------------
// ✅ RUTAS DE RESEÑAS
// ----------------------------------

// Crear una nueva reseña
// POST /api/resenas
// Protegida: solo usuarios autenticados pueden crear reseñas
router.post("/", verificarToken, crearResena);

// Obtener todas las reseñas (para admin o listado general)
// GET /api/resenas
router.get("/", obtenerResenas);

// Obtener reseñas de un juego específico
// GET /api/resenas/juego/:juegoId
router.get("/juego/:juegoId", obtenerResenasPorJuego);

// Obtener las reseñas del usuario autenticado
// GET /api/resenas/mis-resenas
// Protegida: requiere token
router.get("/mis-resenas", verificarToken, obtenerMisResenas);

// Actualizar una reseña específica
// PUT /api/resenas/:id
// Protegida: solo el propietario puede actualizar su reseña
router.put("/:id", verificarToken, actualizarResena);

// Eliminar una reseña específica
// DELETE /api/resenas/:id
// Protegida: solo el propietario puede eliminar su reseña
router.delete("/:id", verificarToken, eliminarResena);

module.exports = router;
// Exportamos el router para integrarlo en app.js o server.js
