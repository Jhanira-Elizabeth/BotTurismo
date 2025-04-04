const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class EtiquetaService {
  constructor() {}

  // Crear una nueva etiqueta turística
  async create(data) {
    const query = `
      INSERT INTO etiquetas_turisticas (nombre, descripcion, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:nombre, :descripcion, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newEtiqueta] = await sequelize.query(query, {
      replacements: data,
    });
    return newEtiqueta;
  }

  // Obtener todas las etiquetas turísticas
  async find() {
    const query = 'SELECT * FROM etiquetas_turisticas';
    const [data] = await sequelize.query(query);
    return data;
  }

  // Obtener una etiqueta turística por ID
  async findOne(id) {
    const query = 'SELECT * FROM etiquetas_turisticas WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Etiqueta turística no encontrada');
    }
    return data[0];
  }

  // Actualizar una etiqueta turística
  async update(id, changes) {
    const query = `
      UPDATE etiquetas_turisticas
      SET nombre = COALESCE(:nombre, nombre),
          descripcion = COALESCE(:descripcion, descripcion),
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
      throw boom.notFound('Etiqueta turística no encontrada');
    }
    return updatedEtiqueta[0];
  }

  // Eliminar una etiqueta turística
  async delete(id) {
    const query = 'DELETE FROM etiquetas_turisticas WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Etiqueta turística no encontrada');
    }
    return { id: result[0].id };
  }
}

module.exports = EtiquetaService;