const express = require("express");
const router = express.Router();
// Creamos un router de Express para definir rutas específicas de usuarios

const multer = require("multer");
const path = require("path");
// Multer: middleware para subir archivos
// Path: para manejar extensiones de archivos y rutas

const { verificarToken } = require("../middleware/authMiddleware");
// Middleware que verifica que el usuario esté autenticado

const {
  obtenerPerfil,
  actualizarPerfil,
} = require("../controllers/usuarioControllers");
// Controladores que contienen la lógica para obtener y actualizar el perfil

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta donde se guardarán los archivos subidos
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Nombre único para cada archivo: timestamp + extensión original
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
// Creamos el middleware de Multer con esta configuración

// rutas

// Obtener perfil
// GET /api/usuarios/perfil
// Protegida con token
router.get("/perfil", verificarToken, obtenerPerfil);

// Actualizar perfil
// PUT /api/usuarios/perfil
// Protegida con token
// Permite subir una sola imagen de perfil con el campo "fotoPerfil"
router.put("/perfil", verificarToken, upload.single("fotoPerfil"), actualizarPerfil);

module.exports = router;
// Exportamos el router para usarlo en app.js o server.js
