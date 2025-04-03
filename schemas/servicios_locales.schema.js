const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const id_local = Joi.number().integer().positive();
const servicio = Joi.string().max(255);
const precio = Joi.number().precision(2).positive();
const tipo = Joi.string().max(255);
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear un servicio local
const createServicioSchema = Joi.object({
  id_local: id_local.required(),
  servicio: servicio.required(),
  precio: precio.required(),
  tipo: tipo.required(),
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar un servicio local
const updateServicioSchema = Joi.object({
  id_local,
  servicio,
  precio,
  tipo,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener un servicio local por ID
const getServicioSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createServicioSchema,
  updateServicioSchema,
  getServicioSchema,
};