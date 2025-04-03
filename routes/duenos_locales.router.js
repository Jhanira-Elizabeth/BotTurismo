const express = require('express');

const DuenosLocalesService = require('../services/duenos_locales.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createDuenoSchema,
  updateDuenoSchema,
  getDuenoSchema,
} = require('./../schemas/duenos_locales.schema');

const router = express.Router();
const service = new DuenosLocalesService();

router.get('/', async (req, res, next) => {
  try {
    const duenos = await service.find();
    res.json(duenos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getDuenoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const dueno = await service.findOne(id);
      res.json(dueno);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createDuenoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDueno = await service.create(body);
      res.status(201).json(newDueno);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getDuenoSchema, 'params'),
  validatorHandler(updateDuenoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedDueno = await service.update(id, body);
      res.json(updatedDueno);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getDuenoSchema, 'params'),
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