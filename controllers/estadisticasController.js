const Juego = require("../models/Juego");

/**
 * Obtener estadísticas del usuario según su biblioteca
 * GET /api/juegos/mis-estadisticas
 */
exports.obtenerEstadisticasUsuario = async (req, res) => {
  try {
    // Buscar juegos asociados al usuario autenticado
    const juegos = await Juego.find({ usuarioId: req.usuario.id });

    if (!juegos.length) {
      return res.json({
        totalJuegos: 0,
        completados: 0,
        porcentajeCompletados: 0,
        promedioPuntuacion: 0,
        porPlataforma: {},
        porGenero: {},
      });
    }

    const totalJuegos = juegos.length;
    const completados = juegos.filter((j) => j.completado).length;
    const porcentajeCompletados = Math.round((completados / totalJuegos) * 100);

    const puntuaciones = juegos.map((j) => j.puntuacion || 0);
    const promedioPuntuacion =
      puntuaciones.reduce((a, b) => a + b, 0) / puntuaciones.length;

    // Contar juegos por plataforma
    const porPlataforma = {};
    juegos.forEach((j) => {
      porPlataforma[j.plataforma] = (porPlataforma[j.plataforma] || 0) + 1;
    });

    // Contar juegos por género
    const porGenero = {};
    juegos.forEach((j) => {
      porGenero[j.genero] = (porGenero[j.genero] || 0) + 1;
    });

    // Responder con estadísticas completas
    res.json({
      totalJuegos,
      completados,
      porcentajeCompletados,
      promedioPuntuacion,
      porPlataforma,
      porGenero,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas del usuario" });
  }
};
