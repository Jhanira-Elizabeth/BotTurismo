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

router.get('/', async (req, res, next) => {
  try {
    const localEtiquetas = await service.find();
    res.json(localEtiquetas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const localEtiqueta = await service.findOne(id);
      res.json(localEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

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

router.patch(
  '/:id',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
  validatorHandler(updateLocalEtiquetaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedLocalEtiqueta = await service.update(id, body);
      res.json(updatedLocalEtiqueta);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getLocalEtiquetaSchema, 'params'),
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