const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
} = require("../controllers/authController");

// Registro de nuevo usuario
router.post("/register", registrarUsuario);

// Login de usuario existente
router.post("/login", loginUsuario);

module.exports = router;
