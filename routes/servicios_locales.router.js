const express = require('express');

const ServiciosLocalesService = require('./../services/servicios_locales.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createServicioSchema,
  updateServicioSchema,
  getServicioSchema,
} = require('./../schemas/servicios_locales.schema');

const router = express.Router();
const service = new ServiciosLocalesService();

router.get('/', async (req, res, next) => {
  try {
    const servicios = await service.find();
    res.json(servicios);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getServicioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const servicio = await service.findOne(id);
      res.json(servicio);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createServicioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newServicio = await service.create(body);
      res.status(201).json(newServicio);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getServicioSchema, 'params'),
  validatorHandler(updateServicioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedServicio = await service.update(id, body);
      res.json(updatedServicio);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getServicioSchema, 'params'),
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