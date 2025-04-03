const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const nombre = Joi.string().max(255);
const descripcion = Joi.string().allow(null, '');
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear una etiqueta turística
const createEtiquetaSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  estado: estado.required(),
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
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener una etiqueta turística por ID
const getEtiquetaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createEtiquetaSchema, updateEtiquetaSchema, getEtiquetaSchema };