const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 🔥 Importamos las rutas
const juegoRoutes = require("./routes/juegoRoutes");
const reseñaRoutes = require("./routes/reseñaRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 ESTA ES CLAVE

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

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
