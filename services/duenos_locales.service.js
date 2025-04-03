const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class DuenosService {
  constructor() {}

  async create(data) {
    const query = `
      INSERT INTO duenos_locales (nombre, apellido, cedula, telefono, email, contrasena, departamento, estado, creado_por, editado_por, fecha_creacion, fecha_ultima_edicion)
      VALUES (:nombre, :apellido, :cedula, :telefono, :email, :contrasena, :departamento, :estado, :creado_por, :editado_por, :fecha_creacion, :fecha_ultima_edicion)
      RETURNING *;
    `;
    const [newDueno] = await sequelize.query(query, {
      replacements: data,
    });
    return newDueno;
  }

  async find() {
    const query = 'SELECT * FROM duenos_locales';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM duenos_locales WHERE id = :id';
    const [data] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!data.length) {
      throw boom.notFound('Dueño no encontrado');
    }
    return data[0];
  }

  async update(id, changes) {
    const query = `
      UPDATE duenos_locales
      SET nombre = COALESCE(:nombre, nombre),
          apellido = COALESCE(:apellido, apellido),
          cedula = COALESCE(:cedula, cedula),
          telefono = COALESCE(:telefono, telefono),
          email = COALESCE(:email, email),
          contrasena = COALESCE(:contrasena, contrasena),
          departamento = COALESCE(:departamento, departamento),
          estado = COALESCE(:estado, estado),
          editado_por = COALESCE(:editado_por, editado_por),
          fecha_ultima_edicion = COALESCE(:fecha_ultima_edicion, fecha_ultima_edicion)
      WHERE id = :id
      RETURNING *;
    `;
    const [updatedDueno] = await sequelize.query(query, {
      replacements: { id, ...changes },
    });
    if (!updatedDueno.length) {
      throw boom.notFound('Dueño no encontrado');
    }
    return updatedDueno[0];
  }

  async delete(id) {
    const query = 'DELETE FROM duenos_locales WHERE id = :id RETURNING id';
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    if (!result.length) {
      throw boom.notFound('Dueño no encontrado');
    }
    return { id: result[0].id };
  }
}

module.exports = DuenosService;