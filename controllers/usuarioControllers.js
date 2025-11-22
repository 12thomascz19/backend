const Usuario = require("../models/Usuario");
const fs = require("fs");
const path = require("path");

/**
 *Obtener perfil del usuario autenticado
 * GET /api/usuarios/perfil
 */
exports.obtenerPerfil = async (req, res) => {
  try {
    // Buscar usuario por ID (desde el token)
    const usuario = await Usuario.findById(req.usuario.id).select("-password"); // Excluir contraseña
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};

/**
 * Actualizar perfil (nombre, descripción, foto)
 * PUT /api/usuarios/perfil
 */
exports.actualizarPerfil = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    let fotoPerfil = req.body.fotoPerfil;

    // Si se envía un archivo (subida de imagen), actualizamos la ruta
    if (req.file) {
      fotoPerfil = `/uploads/${req.file.filename}`;
    }

    // Actualizar usuario en la base de datos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.usuario.id,
      { nombre, descripcion, fotoPerfil },
      { new: true } // Retorna el documento actualizado
    ).select("-password"); // Excluir contraseña

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar perfil", error });
  }
};
