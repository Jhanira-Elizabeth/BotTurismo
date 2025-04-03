const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ActividadService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO actividad_punto_turistico (id_punto_turistico, actividad, precio, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion, tipo)
      VALUES (:id_punto_turistico, :actividad, :precio, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion, :tipo)
      RETURNING *;
    `;
    const [newActividad] = await sequelize.query(query, {
      replacements: data,
    });
    return newActividad;
  }

  async find() {
    const query = 'SELECT * FROM actividad_punto_turistico';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM actividad_punto_turistico WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Actividad no encontrada');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE actividad_punto_turistico
      SET id_punto_turistico = COALESCE(:id_punto_turistico, id_punto_turistico),
          actividad = COALESCE(:actividad, actividad),
          precio = COALESCE(:precio, precio),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion),
          tipo = COALESCE(:tipo, tipo)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedActividad] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedActividad.length) {
      throw boom.notFound('Actividad no encontrada');
    }
    return updatedActividad[0];
  }

  async delete(id) {
    const query = 'DELETE FROM actividad_punto_turistico WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Actividad no encontrada');
    }
    return { id: result[0].id };
  }
}

module.exports = ActividadService;