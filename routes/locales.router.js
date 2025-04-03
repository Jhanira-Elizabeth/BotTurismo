const express = require('express');

const LocalesService = require('./../services/locales.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createLocalSchema,
  updateLocalSchema,
  getLocalSchema,
} = require('./../schemas/locales.schema');

const router = express.Router();
const service = new LocalesService();

router.get('/', async (req, res, next) => {
  try {
    const locales = await service.find();
    res.json(locales);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getLocalSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const local = await service.findOne(id);
      res.json(local);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createLocalSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLocal = await service.create(body);
      res.status(201).json(newLocal);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getLocalSchema, 'params'),
  validatorHandler(updateLocalSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedLocal = await service.update(id, body);
      res.json(updatedLocal);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getLocalSchema, 'params'),
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