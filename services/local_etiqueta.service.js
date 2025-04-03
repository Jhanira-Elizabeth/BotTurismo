const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class LocalEtiquetaService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO local_etiqueta (id_local, id_etiqueta, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:id_local, :id_etiqueta, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newLocalEtiqueta] = await sequelize.query(query, {
      replacements: data,
    });
    return newLocalEtiqueta;
  }

  async find() {
    const query = 'SELECT * FROM local_etiqueta';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM local_etiqueta WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Relación local-etiqueta no encontrada');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE local_etiqueta
      SET id_local = COALESCE(:id_local, id_local),
          id_etiqueta = COALESCE(:id_etiqueta, id_etiqueta),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedLocalEtiqueta] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedLocalEtiqueta.length) {
      throw boom.notFound('Relación local-etiqueta no encontrada');
    }
    return updatedLocalEtiqueta[0];
  }

  async delete(id) {
    const query = 'DELETE FROM local_etiqueta WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Relación local-etiqueta no encontrada');
    }
    return { id: result[0].id };
  }
}

module.exports = LocalEtiquetaService;