const express = require('express');
const PuntoEtiquetaService = require('./../services/punto_etiqueta.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createPuntoEtiquetaSchema,
  updatePuntoEtiquetaSchema,
  getPuntoEtiquetaSchema,
} = require('./../schemas/punto_etiqueta.schema');

const router = express.Router();
const service = new PuntoEtiquetaService();

// Obtener todas las relaciones
router.get('/', async (req, res, next) => {
  try {
    const relaciones = await service.find();
    res.json(relaciones);
  } catch (error) {
    next(error);
  }
});

// Obtener una relación específica
router.get(
  '/:id_punto_turistico/:id_etiqueta',
  validatorHandler(getPuntoEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_punto_turistico, id_etiqueta } = req.params;
      const relacion = await service.findOne(id_punto_turistico, id_etiqueta);
      res.json(relacion);
    } catch (error) {
      next(error);
    }
  },
);

// Crear una nueva relación
router.post(
  '/',
  validatorHandler(createPuntoEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const nuevaRelacion = await service.create(body);
      res.status(201).json(nuevaRelacion);
    } catch (error) {
      next(error);
    }
  },
);

// Actualizar una relación existente
router.patch(
  '/:id_punto_turistico/:id_etiqueta',
  validatorHandler(getPuntoEtiquetaSchema, 'params'),
  validatorHandler(updatePuntoEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_punto_turistico, id_etiqueta } = req.params;
      const body = req.body;
      const actualizada = await service.update(id_punto_turistico, id_etiqueta, body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  },
);

// Eliminar una relación
router.delete(
  '/:id_punto_turistico/:id_etiqueta',
  validatorHandler(getPuntoEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_punto_turistico, id_etiqueta } = req.params;
      await service.delete(id_punto_turistico, id_etiqueta);
      res.status(201).json({ message: 'Relación eliminada', id_punto_turistico, id_etiqueta });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;