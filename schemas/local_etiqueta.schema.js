const Joi = require('joi');

const id_local = Joi.number().integer().positive().required();
const id_etiqueta = Joi.number().integer().positive().required();
const estado = Joi.string().valid('activo', 'inactivo').required();
const creado_por = Joi.string().min(3).max(50).required();
const editado_por = Joi.string().min(3).max(50).allow(null);
const fecha_creacion = Joi.date().iso().required();
const fecha_ultima_edicion = Joi.date().iso().required();

const createLocalEtiquetaSchema = Joi.object({
  id_local,
  id_etiqueta,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

const updateLocalEtiquetaSchema = Joi.object({
  estado: estado.optional(),
  editado_por: editado_por.optional(),
  fecha_ultima_edicion: fecha_ultima_edicion.optional(),
}).min(1);

const getLocalEtiquetaSchema = Joi.object({
  id_local,
  id_etiqueta,
});

module.exports = {
  createLocalEtiquetaSchema,
  updateLocalEtiquetaSchema,
  getLocalEtiquetaSchema,
};