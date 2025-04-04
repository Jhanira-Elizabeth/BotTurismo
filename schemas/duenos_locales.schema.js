const Joi = require('joi');

// Esquemas para las propiedades individuales
const id = Joi.number().integer().positive();
const nombre = Joi.string().max(255);
const apellido = Joi.string().max(255);
const cedula = Joi.string().max(20);
const telefono = Joi.string().max(20);
const email = Joi.string().email().max(255);
const contrasena = Joi.string().max(255);
const estado = Joi.string().valid('activo', 'inactivo').max(20);
const creado_por = Joi.string().max(255).allow(null, '');
const editado_por = Joi.string().max(255).allow(null, '');
const fecha_creacion = Joi.date().iso().allow(null);
const fecha_ultima_edicion = Joi.date().iso().allow(null);

// Esquema para crear un dueño local
const createDuenoSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  cedula: cedula.required(),
  telefono: telefono.required(),
  email: email.required(),
  contrasena: contrasena.required(),
  estado: estado.required(),
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para actualizar un dueño local
const updateDuenoSchema = Joi.object({
  nombre,
  apellido,
  cedula,
  telefono,
  email,
  contrasena,
  estado,
  creado_por,
  editado_por,
  fecha_creacion,
  fecha_ultima_edicion,
});

// Esquema para obtener un dueño local por ID
const getDuenoSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDuenoSchema, updateDuenoSchema, getDuenoSchema };