'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('local_etiqueta', {
      id_local: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_etiqueta: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('local_etiqueta');
  },
};