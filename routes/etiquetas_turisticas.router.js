const express = require('express');

const EtiquetasTuristicasService = require('../services/etiquetas_turisticas.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createEtiquetaSchema,
  updateEtiquetaSchema,
  getEtiquetaSchema,
} = require('./../schemas/etiquetas_turisticas.schema');

const router = express.Router();
const service = new EtiquetasTuristicasService();

router.get('/', async (req, res, next) => {
  try {
    const etiquetas = await service.find();
    res.json(etiquetas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const etiqueta = await service.findOne(id);
      res.json(etiqueta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEtiqueta = await service.create(body);
      res.status(201).json(newEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getEtiquetaSchema, 'params'),
  validatorHandler(updateEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedEtiqueta = await service.update(id, body);
      res.json(updatedEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;