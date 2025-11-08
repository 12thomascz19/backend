const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Importamos las rutas
const juegoRoutes = require("./routes/juegoRoutes");
const reseñaRoutes = require("./routes/reseñaRoutes");
const authRoutes = require("./routes/authRoutes");
const explorarRoutes = require("./routes/explorarRoutes");
const estadisticasRoutes = require("./routes/estadisticasRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Conectamos a la base de datos
connectDB();

// Ruta base
app.get("/", (req, res) => {
  res.send("🎮 API GameTracker funcionando correctamente");
});

// 🔥 Usamos las rutas
app.use("/api/juegos", juegoRoutes);
app.use("/api/reseñas", reseñaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/explorar", explorarRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Servir archivos estáticos de la carpeta uploads
app.use("/uploads", express.static("uploads"));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
