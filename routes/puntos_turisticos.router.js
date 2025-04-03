const express = require('express');

const PuntosTuristicosService = require('./../services/puntos_turisticos.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPuntoSchema,
  updatePuntoSchema,
  getPuntoSchema,
} = require('./../schemas/puntos_turisticos.schema');

const router = express.Router();
const service = new PuntosTuristicosService();

router.get('/', async (req, res, next) => {
  try {
    const puntos = await service.find();
    res.json(puntos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPuntoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const punto = await service.findOne(id);
      res.json(punto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createPuntoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPunto = await service.create(body);
      res.status(201).json(newPunto);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getPuntoSchema, 'params'),
  validatorHandler(updatePuntoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedPunto = await service.update(id, body);
      res.json(updatedPunto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getPuntoSchema, 'params'),
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