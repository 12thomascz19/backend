const Usuario = require("../models/Usuario");
const fs = require("fs");
const path = require("path");

// 📘 Obtener perfil del usuario autenticado
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};

// 📝 Actualizar perfil (nombre, descripción, foto)
exports.actualizarPerfil = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    let fotoPerfil = req.body.fotoPerfil;

    // Si viene un archivo, lo guardamos
    if (req.file) {
      fotoPerfil = `/uploads/${req.file.filename}`;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.usuario.id,
      { nombre, descripcion, fotoPerfil },
      { new: true }
    ).select("-password");

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar perfil", error });
  }
};
