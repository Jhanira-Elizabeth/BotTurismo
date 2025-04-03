const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const nombre = Joi.string().max(255);
const fecha_fundacion = Joi.string().max(255);
const poblacion = Joi.string().max(255);
const temperatura_promedio = Joi.string().max(255);
const descripcion = Joi.string().allow(null, '');
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear una parroquia
const createParroquiaSchema = Joi.object({
  nombre: nombre.required(),
  fecha_fundacion: fecha_fundacion.required(),
  poblacion: poblacion.required(),
  temperatura_promedio: temperatura_promedio.required(),
  descripcion,
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar una parroquia
const updateParroquiaSchema = Joi.object({
  nombre,
  fecha_fundacion,
  poblacion,
  temperatura_promedio,
  descripcion,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener una parroquia por ID
const getParroquiaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createParroquiaSchema, updateParroquiaSchema, getParroquiaSchema };