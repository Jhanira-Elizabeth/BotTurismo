const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class LocalesService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO locales_turisticos (nombre, descripcion, id_dueno, direccion, latitud, longitud, id_parroquia, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:nombre, :descripcion, :id_dueno, :direccion, :latitud, :longitud, :id_parroquia, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newLocal] = await sequelize.query(query, {
      replacements: data,
    });
    return newLocal;
  }

  async find() {
    const query = 'SELECT * FROM locales_turisticos';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM locales_turisticos WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Local turístico no encontrado');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE locales_turisticos
      SET nombre = COALESCE(:nombre, nombre),
          descripcion = COALESCE(:descripcion, descripcion),
          id_dueno = COALESCE(:id_dueno, id_dueno),
          direccion = COALESCE(:direccion, direccion),
          latitud = COALESCE(:latitud, latitud),
          longitud = COALESCE(:longitud, longitud),
          id_parroquia = COALESCE(:id_parroquia, id_parroquia),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedLocal] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedLocal.length) {
      throw boom.notFound('Local turístico no encontrado');
    }
    return updatedLocal[0];
  }

  async delete(id) {
    const query = 'DELETE FROM locales_turisticos WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Local turístico no encontrado');
    }
    return { id: result[0].id };
  }
}

module.exports = LocalesService;