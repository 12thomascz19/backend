const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si ya existe el usuario
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear nuevo usuario
    usuario = new Usuario({ nombre, email, password });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar en la base de datos
    await usuario.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};
