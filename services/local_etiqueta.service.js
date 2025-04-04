const boom = require('@hapi/boom');
const { sequelize } = require('./../libs/sequelize');

class LocalEtiquetaService {
  constructor() {}

  // Obtener todas las relaciones
  async find() {
    try {
      const query = 'SELECT * FROM local_etiqueta';
      const [data] = await sequelize.query(query);
      return data;
    } catch (error) {
      console.error('Error al obtener las relaciones:', error);
      throw boom.internal('Error al obtener las relaciones');
    }
  }

  // Obtener una relación específica
  async findOne(id_local, id_etiqueta) {
    try {
      const query = `
        SELECT * FROM local_etiqueta
        WHERE id_local = :id_local AND id_etiqueta = :id_etiqueta
      `;
      const [data] = await sequelize.query(query, {
        replacements: { id_local, id_etiqueta },
      });
      if (data.length === 0) {
        throw boom.notFound('Relación no encontrada');
      }
      return data[0];
    } catch (error) {
      console.error('Error al obtener la relación:', error);
      throw boom.internal('Error al obtener la relación');
    }
  }

  // Crear una nueva relación
  async create(data) {
    try {
      const query = `
        INSERT INTO local_etiqueta (id_local, id_etiqueta, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
        VALUES (:id_local, :id_etiqueta, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
        RETURNING *;
      `;
      const [result] = await sequelize.query(query, {
        replacements: data,
      });
      return result[0];
    } catch (error) {
      if (error.parent?.code === '23505') {
        throw boom.conflict('La relación ya existe.');
      }
      console.error('Error al crear la relación:', error);
      throw boom.internal('Error al crear la relación');
    }
  }

  // Actualizar una relación existente
  async update(id_local, id_etiqueta, changes) {
    try {
      const query = `
        UPDATE local_etiqueta
        SET estado = :estado, editado_por = :editado_por, fecha_ultima_edicion = :fecha_ultima_edicion
        WHERE id_local = :id_local AND id_etiqueta = :id_etiqueta
        RETURNING *;
      `;
      const [result] = await sequelize.query(query, {
        replacements: { ...changes, id_local, id_etiqueta },
      });
      if (result.length === 0) {
        throw boom.notFound('Relación no encontrada');
      }
      return result[0];
    } catch (error) {
      console.error('Error al actualizar la relación:', error);
      throw boom.internal('Error al actualizar la relación');
    }
  }

  // Eliminar una relación
  async delete(id_local, id_etiqueta) {
    try {
      const query = `
        DELETE FROM local_etiqueta
        WHERE id_local = :id_local AND id_etiqueta = :id_etiqueta
        RETURNING *;
      `;
      const [result] = await sequelize.query(query, {
        replacements: { id_local, id_etiqueta },
      });
      if (result.length === 0) {
        throw boom.notFound('Relación no encontrada');
      }
      return result[0];
    } catch (error) {
      console.error('Error al eliminar la relación:', error);
      throw boom.internal('Error al eliminar la relación');
    }
  }
}

module.exports = LocalEtiquetaService;