// require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes'); // Importa tus rutas de API
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

// Habilitar CORS (puedes especificar orígenes más restrictivos en producción)
app.use(cors());

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Rutas de la API
routerApi(app); // Aquí se montan todas tus rutas de la API

// Middleware de manejo de errores (el orden es importante)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API del backend de Tursd está funcionando!');
});

app.listen(port, () => {
  console.log('Servidor backend escuchando en el puerto ' + port);
});