const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class HorariosService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO horarios_atencion (id_local, dia_semana, hora_inicio, hora_fin, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:id_local, :dia_semana, :hora_inicio, :hora_fin, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newHorario] = await sequelize.query(query, {
      replacements: data,
    });
    return newHorario;
  }

  async find() {
    const query = 'SELECT * FROM horarios_atencion';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM horarios_atencion WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Horario no encontrado');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE horarios_atencion
      SET id_local = COALESCE(:id_local, id_local),
          dia_semana = COALESCE(:dia_semana, dia_semana),
          hora_inicio = COALESCE(:hora_inicio, hora_inicio),
          hora_fin = COALESCE(:hora_fin, hora_fin),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedHorario] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedHorario.length) {
      throw boom.notFound('Horario no encontrado');
    }
    return updatedHorario[0];
  }

  async delete(id) {
    const query = 'DELETE FROM horarios_atencion WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Horario no encontrado');
    }
    return { id: result[0].id };
  }
}

module.exports = HorariosService;