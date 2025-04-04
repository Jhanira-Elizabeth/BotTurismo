const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const nombre = Joi.string().max(255).required();
const descripcion = Joi.string().max(255).allow(null, '');
const estado = Joi.string().valid('activo', 'inactivo').max(20).required();
const creado_por = Joi.string().max(255).required();
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().required();
const fecha_ultima_edicion = Joi.date().iso().required();

// Esquema para crear una etiqueta turística
const createEtiquetaSchema = Joi.object({
  nombre,
  descripcion,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar una etiqueta turística
const updateEtiquetaSchema = Joi.object({
  nombre,
  descripcion,
  estado,
  editado_por,
  fecha_ultima_edicion,
});

// Esquema para obtener una etiqueta turística por ID
const getEtiquetaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createEtiquetaSchema, updateEtiquetaSchema, getEtiquetaSchema };