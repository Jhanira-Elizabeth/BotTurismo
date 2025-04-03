const express = require('express');

const ParroquiasService = require('./../services/parroquias.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createParroquiaSchema,
  updateParroquiaSchema,
  getParroquiaSchema,
} = require('./../schemas/parroquias.schema');

const router = express.Router();
const service = new ParroquiasService();

router.get('/', async (req, res, next) => {
  try {
    const parroquias = await service.find();
    res.json(parroquias);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getParroquiaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const parroquia = await service.findOne(id);
      res.json(parroquia);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createParroquiaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newParroquia = await service.create(body);
      res.status(201).json(newParroquia);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getParroquiaSchema, 'params'),
  validatorHandler(updateParroquiaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedParroquia = await service.update(id, body);
      res.json(updatedParroquia);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getParroquiaSchema, 'params'),
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