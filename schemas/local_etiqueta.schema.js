const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const id_local = Joi.number().integer().positive();
const id_etiqueta = Joi.number().integer().positive();
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear una relación entre local y etiqueta
const createLocalEtiquetaSchema = Joi.object({
  id_local: id_local.required(),
  id_etiqueta: id_etiqueta.required(),
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar una relación entre local y etiqueta
const updateLocalEtiquetaSchema = Joi.object({
  id_local,
  id_etiqueta,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener una relación entre local y etiqueta por ID
const getLocalEtiquetaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createLocalEtiquetaSchema,
  updateLocalEtiquetaSchema,
  getLocalEtiquetaSchema,
};