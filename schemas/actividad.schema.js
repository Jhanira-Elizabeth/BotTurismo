const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const id_punto_turistico = Joi.number().integer().positive();
const actividad = Joi.string().max(255);
const precio = Joi.number().precision(2).allow(null);
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);
const tipo = Joi.string().max(50).allow(null, '');

// Esquema para crear una actividad turística
const createActividadSchema = Joi.object({
  id_punto_turistico: id_punto_turistico.required(),
  actividad: actividad.required(),
  precio,
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
  tipo,
});

// Esquema para actualizar una actividad turística
const updateActividadSchema = Joi.object({
  id_punto_turistico,
  actividad,
  precio,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
  tipo,
});

// Esquema para obtener una actividad turística por ID
const getActividadSchema = Joi.object({
  id: id.required(),
});

module.exports = { createActividadSchema, updateActividadSchema, getActividadSchema };