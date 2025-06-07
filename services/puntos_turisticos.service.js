const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class PuntosService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO puntos_turisticos (nombre, descripcion, latitud, longitud, id_parroquia, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:nombre, :descripcion, :latitud, :longitud, :id_parroquia, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newPunto] = await sequelize.query(query, {
      replacements: data,
    });
    return newPunto;
  }

  async find() {
    const query = 'SELECT * FROM puntos_turisticos';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM puntos_turisticos WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Punto turístico no encontrado');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE puntos_turisticos
      SET nombre = COALESCE(:nombre, nombre),
          descripcion = COALESCE(:descripcion, descripcion),
          latitud = COALESCE(:latitud, latitud),
          longitud = COALESCE(:longitud, longitud),
          id_parroquia = COALESCE(:id_parroquia, id_parroquia),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedPunto] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedPunto.length) {
      throw boom.notFound('Punto turístico no encontrado');
    }
    return updatedPunto[0];
  }

  async delete(id) {
    const query = 'DELETE FROM puntos_turisticos WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Punto turístico no encontrado');
    }
    return { id: result[0].id };
  }

  async findAll(query) {
  const { id_etiqueta } = query;

  const where = { estado: true };

  let include = [];

  if (id_etiqueta) {
    include.push({
      model: PuntoEtiquetaModel,
      as: 'etiquetas',
      where: { id_etiqueta, estado: true },
    });
  }

  const data = await this.model.findAll({
    where,
    include,
  });

  return data;
}

}



module.exports = PuntosService;