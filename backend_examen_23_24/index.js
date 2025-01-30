// Importar librería express --> web server
const express = require("express");

// Importar libreria CORS
const cors = require("cors");

// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");

// Importar gestores de rutas
const notaRoutes = require("./routes/notaRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Configurar rutas de la API Rest
app.use("/api/notas", notaRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
