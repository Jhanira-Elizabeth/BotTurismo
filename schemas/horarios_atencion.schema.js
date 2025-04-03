const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const id_local = Joi.number().integer().positive();
const dia_semana = Joi.string().valid(
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo'
);
const hora_inicio = Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/); // Formato HH:mm
const hora_fin = Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/); // Formato HH:mm
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear un horario de atención
const createHorarioSchema = Joi.object({
  id_local: id_local.required(),
  dia_semana: dia_semana.required(),
  hora_inicio: hora_inicio.required(),
  hora_fin: hora_fin.required(),
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar un horario de atención
const updateHorarioSchema = Joi.object({
  id_local,
  dia_semana,
  hora_inicio,
  hora_fin,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener un horario de atención por ID
const getHorarioSchema = Joi.object({
  id: id.required(),
});

module.exports = { createHorarioSchema, updateHorarioSchema, getHorarioSchema };