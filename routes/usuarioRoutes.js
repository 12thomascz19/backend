const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verificarToken } = require("../middleware/authMiddleware");
const {
  obtenerPerfil,
  actualizarPerfil,
} = require("../controllers/usuarioControllers");

// 📸 Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ✅ Rutas
router.get("/perfil", verificarToken, obtenerPerfil);
router.put("/perfil", verificarToken, upload.single("fotoPerfil"), actualizarPerfil);

module.exports = router;
