'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('actividad_punto_turistico', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_punto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: true,
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
      descripcion: {
        type: Sequelize.TEXT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('actividad_punto_turistico');
  },
};