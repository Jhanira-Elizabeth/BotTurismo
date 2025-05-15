const Joi = require('joi');

const id_punto_turistico = Joi.number().integer().positive().required();
const id_etiqueta = Joi.number().integer().positive().required();
const estado = Joi.string().valid('activo', 'inactivo').required();
const creado_por = Joi.string().min(3).max(50).required();
const editado_por = Joi.string().min(3).max(50).allow(null);
const fecha_creacion = Joi.date().iso().required();
const fecha_ultima_edicion = Joi.date().iso().required();

const createPuntoEtiquetaSchema = Joi.object({
  id_punto_turistico,
  id_etiqueta,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

const updatePuntoEtiquetaSchema = Joi.object({
  estado: estado.optional(),
  editado_por: editado_por.optional(),
  fecha_ultima_edicion: fecha_ultima_edicion.optional(),
}).min(1);

const getPuntoEtiquetaSchema = Joi.object({
  id_punto_turistico,
  id_etiqueta,
});

module.exports = {
  createPuntoEtiquetaSchema,
  updatePuntoEtiquetaSchema,
  getPuntoEtiquetaSchema,
};