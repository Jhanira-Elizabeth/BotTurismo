'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('puntos_turisticos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
      direccion: {
        type: Sequelize.TEXT,
      },
      latitud: {
        type: Sequelize.FLOAT,
      },
      longitud: {
        type: Sequelize.FLOAT,
      },
      estado: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('puntos_turisticos');
  },
};