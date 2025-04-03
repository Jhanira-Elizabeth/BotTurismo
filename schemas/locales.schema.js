const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const nombre = Joi.string().max(255);
const descripcion = Joi.string().allow(null, '');
const id_dueno = Joi.number().integer().positive().allow(null);
const direccion = Joi.string().max(255).allow(null, '');
const latitud = Joi.number().precision(6).allow(null);
const longitud = Joi.number().precision(6).allow(null);
const id_parroquia = Joi.number().integer().positive().allow(null);
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear un local turístico
const createLocalSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  id_dueno,
  direccion,
  latitud,
  longitud,
  id_parroquia,
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar un local turístico
const updateLocalSchema = Joi.object({
  nombre,
  descripcion,
  id_dueno,
  direccion,
  latitud,
  longitud,
  id_parroquia,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener un local turístico por ID
const getLocalSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLocalSchema, updateLocalSchema, getLocalSchema };