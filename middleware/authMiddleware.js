const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Acceso denegado. No hay token." });

  try {
    const token = authHeader.split(" ")[1];
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
