const jwt = require("jsonwebtoken");

/**
 * Middleware para verificar el token JWT en las rutas privadas
 * Agrega la información del usuario a req.usuario si el token es válido
 */
exports.verificarToken = (req, res, next) => {
  // Obtener el header Authorization
  const authHeader = req.header("Authorization");

  // Si no existe el header, denegar acceso
  if (!authHeader) {
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    // El token suele enviarse como "Bearer <token>", se separa y se toma la segunda parte
    const token = authHeader.split(" ")[1];

    // Verificar el token usando la clave secreta definida en .env
    const verificado = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar los datos del usuario al objeto req para que las rutas puedan usarlos
    req.usuario = verificado;

    // Continuar con la siguiente función/middleware
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
