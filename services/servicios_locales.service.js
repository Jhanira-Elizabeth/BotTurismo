const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ServiciosService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO servicios_locales (id_local, servicio, precio, tipo, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:id_local, :servicio, :precio, :tipo, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newServicio] = await sequelize.query(query, {
      replacements: data,
    });
    return newServicio;
  }

  async find() {
    const query = 'SELECT * FROM servicios_locales';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM servicios_locales WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Servicio no encontrado');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE servicios_locales
      SET id_local = COALESCE(:id_local, id_local),
          servicio = COALESCE(:servicio, servicio),
          precio = COALESCE(:precio, precio),
          tipo = COALESCE(:tipo, tipo),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedServicio] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedServicio.length) {
      throw boom.notFound('Servicio no encontrado');
    }
    return updatedServicio[0];
  }

  async delete(id) {
    const query = 'DELETE FROM servicios_locales WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Servicio no encontrado');
    }
    return { id: result[0].id };
  }
}

module.exports = ServiciosService;