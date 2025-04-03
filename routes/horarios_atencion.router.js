const express = require('express');

const HorariosAtencionService = require('./../services/horarios_atencion.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createHorarioSchema,
  updateHorarioSchema,
  getHorarioSchema,
} = require('./../schemas/horarios_atencion.schema');

const router = express.Router();
const service = new HorariosAtencionService();

router.get('/', async (req, res, next) => {
  try {
    const horarios = await service.find();
    res.json(horarios);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getHorarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const horario = await service.findOne(id);
      res.json(horario);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createHorarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newHorario = await service.create(body);
      res.status(201).json(newHorario);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getHorarioSchema, 'params'),
  validatorHandler(updateHorarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedHorario = await service.update(id, body);
      res.json(updatedHorario);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getHorarioSchema, 'params'),
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