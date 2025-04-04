const express = require('express'); // Importar express
const app = express(); // Asignar express a mi aplicación
const port = 3000; // Asignación puerto donde se ejecutará el proy
const routerApi = require('./routes'); // Importar las rutas
const path = require('path'); // Importar path para manejar rutas de archivos
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors'); // Importar cors para habilitar CORS


app.use(express.json());

const corsOptions = {
  origin: 'https://tursd.onrender.com', // Permite solo solicitudes desde este origen
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Los métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));


app.get('/locales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'locales.html'));
});
app.get('/puntos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'puntos.html'));
});
app.get('/etiquetas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'etiquetas.html'));
});
app.get('/actividades', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'actividades.html'));
});
app.get('/duenos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'duenos.html'));
});
app.get('/parroquias', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'parroquias.html'));
});
app.get('/servicios', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'servicios.html'));
});
app.get('/horarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'horarios.html'));
});
app.get('/local-etiqueta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'local_etiqueta.html'));
});

// Rutas de la API
routerApi(app); // Aquí se agregan las rutas de la API (por ejemplo, productos)
// Manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hola servidor de express');
});

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
