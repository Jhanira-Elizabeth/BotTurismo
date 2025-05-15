const express = require('express');
const localesRouter = require('./locales.router');
const puntosRouter = require('./puntos_turisticos.router');
const etiquetaRouter = require('./etiquetas_turisticas.router');
const actividadRouter = require('./actividad.router');
const localEtiquetaRouter = require('./local_etiqueta.router');
const puntoEtiquetaRouter = require('./punto_etiqueta.router');
const serviciosRouter = require('./servicios_locales.router');
const duenosRouter = require('./duenos_locales.router');
const parroquiasRouter = require('./parroquias.router');
const horariosRouter = require('./horarios_atencion.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/locales', localesRouter);
  router.use('/puntos', puntosRouter);
  router.use('/etiquetas', etiquetaRouter);
  router.use('/actividades', actividadRouter);
  router.use('/local-etiqueta', localEtiquetaRouter);
  router.use('/punto-etiqueta', puntoEtiquetaRouter); 
  router.use('/servicios', serviciosRouter);
  router.use('/duenos', duenosRouter);
  router.use('/parroquias', parroquiasRouter);
  router.use('/horarios', horariosRouter);
}

module.exports = routerApi;