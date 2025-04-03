const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class EtiquetaService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO puntos_turisticos_etiqueta (id_punto_turistico, id_etiqueta, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:id_punto_turistico, :id_etiqueta, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newEtiqueta] = await sequelize.query(query, {
      replacements: data,
    });
    return newEtiqueta;
  }

  async find() {
    const query = 'SELECT * FROM puntos_turisticos_etiqueta';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM puntos_turisticos_etiqueta WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Relación etiqueta no encontrada');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE puntos_turisticos_etiqueta
      SET id_punto_turistico = COALESCE(:id_punto_turistico, id_punto_turistico),
          id_etiqueta = COALESCE(:id_etiqueta, id_etiqueta),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedEtiqueta] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedEtiqueta.length) {
      throw boom.notFound('Relación etiqueta no encontrada');
    }
    return updatedEtiqueta[0];
  }

  async delete(id) {
    const query = 'DELETE FROM puntos_turisticos_etiqueta WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Relación etiqueta no encontrada');
    }
    return { id: result[0].id };
  }
}

module.exports = EtiquetaService;