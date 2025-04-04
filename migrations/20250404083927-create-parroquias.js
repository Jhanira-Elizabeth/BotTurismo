'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parroquias', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_fundacion: {
        type: Sequelize.STRING,
      },
      poblacion: {
        type: Sequelize.STRING,
      },
      temperatura: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'activo',
      },
      creado_por: {
        type: Sequelize.STRING(50),
      },
      editado_por: {
        type: Sequelize.STRING(50),
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      fecha_ultima_edicion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parroquias');
  },
};