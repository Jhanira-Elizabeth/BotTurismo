const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ParroquiasService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO parroquias (nombre, fecha_fundacion, poblacion, temperatura_promedio, descripcion, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:nombre, :fecha_fundacion, :poblacion, :temperatura_promedio, :descripcion, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newParroquia] = await sequelize.query(query, {
      replacements: data,
    });
    return newParroquia;
  }

  async find() {
    const query = 'SELECT * FROM parroquias';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM parroquias WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Parroquia no encontrada');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE parroquias
      SET nombre = COALESCE(:nombre, nombre),
          fecha_fundacion = COALESCE(:fecha_fundacion, fecha_fundacion),
          poblacion = COALESCE(:poblacion, poblacion),
          temperatura_promedio = COALESCE(:temperatura_promedio, temperatura_promedio),
          descripcion = COALESCE(:descripcion, descripcion),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedParroquia] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedParroquia.length) {
      throw boom.notFound('Parroquia no encontrada');
    }
    return updatedParroquia[0];
  }

  async delete(id) {
    const query = 'DELETE FROM parroquias WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Parroquia no encontrada');
    }
    return { id: result[0].id };
  }
}

module.exports = ParroquiasService;