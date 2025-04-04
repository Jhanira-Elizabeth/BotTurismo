const express = require('express');
const LocalEtiquetaService = require('./../services/local_etiqueta.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createLocalEtiquetaSchema,
  updateLocalEtiquetaSchema,
  getLocalEtiquetaSchema,
} = require('./../schemas/local_etiqueta.schema');

const router = express.Router();
const service = new LocalEtiquetaService();

// Obtener todas las relaciones
router.get('/', async (req, res, next) => {
  try {
    const localEtiquetas = await service.find();
    res.json(localEtiquetas);
  } catch (error) {
    next(error);
  }
});

// Obtener una relación específica
router.get(
  '/:id_local/:id_etiqueta',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_local, id_etiqueta } = req.params;
      const localEtiqueta = await service.findOne(id_local, id_etiqueta);
      res.json(localEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

// Crear una nueva relación
router.post(
  '/',
  validatorHandler(createLocalEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLocalEtiqueta = await service.create(body);
      res.status(201).json(newLocalEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

// Actualizar una relación existente
router.patch(
  '/:id_local/:id_etiqueta',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
  validatorHandler(updateLocalEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_local, id_etiqueta } = req.params;
      const body = req.body;
      const updatedLocalEtiqueta = await service.update(id_local, id_etiqueta, body);
      res.json(updatedLocalEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

// Eliminar una relación
router.delete(
  '/:id_local/:id_etiqueta',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_local, id_etiqueta } = req.params;
      await service.delete(id_local, id_etiqueta);
      res.status(201).json({ message: 'Relación eliminada', id_local, id_etiqueta });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;