# 🎮 GameTracker - Backend

**GameTracker** es una aplicación web que permite a los usuarios crear y gestionar su propia biblioteca personal de videojuegos.  
Cada usuario puede agregar sus juegos, marcar los completados, escribir reseñas y ver únicamente su colección personal.

Este repositorio contiene el **backend** del proyecto, desarrollado con **Node.js, Express y MongoDB Atlas**, para el proyecto final de 2025.

---

## 🚀 Tecnologías utilizadas

- **Node.js** — Entorno de ejecución para JavaScript en el servidor.
- **Express.js** — Framework minimalista para crear APIs REST.
- **MongoDB Atlas** — Base de datos NoSQL en la nube.
- **Mongoose** — Modelado de datos para MongoDB.
- **JWT (Json Web Token)** — Autenticación y protección de rutas.
- **bcryptjs** — Encriptación de contraseñas de usuarios.
- **dotenv** — Manejo de variables de entorno.
- **CORS** — Permite la conexión entre frontend y backend.

---

## 🧩 Estructura del proyecto



backend/
│
├── config/
│ └── db.js # Conexión a MongoDB Atlas
│
├── controllers/
│ ├── authController.js # Registro e inicio de sesión
│ ├── juegoController.js # CRUD de juegos
│ └── reseñaController.js# CRUD de reseñas
│
├── middleware/
│ └── authMiddleware.js # Protección de rutas con JWT
│
├── models/
│ ├── Usuario.js # Modelo de usuario
│ ├── Juego.js # Modelo de juego
│ └── Reseña.js # Modelo de reseña
│
├── routes/
│ ├── authRoutes.js # Rutas de autenticación
│ ├── juegoRoutes.js # Rutas de juegos
│ └── reseñaRoutes.js # Rutas de reseñas
│
├── .env # Variables de entorno (no subir a GitHub)
├── package.json
└── server.js # Punto de entrada principal del servicio                                                                                             ## ⚙️ Instalación y configuración                                                                                                                      npm install 

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tuUsuario/game-tracker-backend.git
cd game-tracker-backend🧾 Ejemplo de flujo completo de prueba

Registrar usuario Thomas

Iniciar sesión y obtener token

Crear un juego → aparece solo para Thomas

Registrar usuario Laura

Iniciar sesión como Laura → su biblioteca estará vacía

Crear un juego para Laura → solo visible para ella

Cada usuario ve solo sus juegos, validando que la autenticación y filtrado funcionan correctamente.



📄 Autor

👤 Thomas Cano Zapata
📚 Media Técnica en Desarrollo de Software
📆 Proyecto Final 2025
🏫 Colombia

🔗 Repositorios relacionados

🖥️ Frontend de GameTracker

⚙️ Backend de GameTracker

📜 Licencia

Este proyecto fue desarrollado con fines académicos y educativos.
Puedes usarlo libremente para aprender, mejorar o crear tus propios proyectos similares.

💫 Créditos

Desarrollado con 💚 por Thomas Cano Zapata
Usando Node.js, Express, MongoDB y JWT para la autenticación segura.
