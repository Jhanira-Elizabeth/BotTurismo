const { Model, DataTypes } = require('sequelize');

class ServiciosLocales extends Model {
  static initModel(sequelize) {
    ServiciosLocales.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_local: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        precio: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        categoria: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: 'activo',
        },
        creado_por: {
          type: DataTypes.STRING(50),
        },
        editado_por: {
          type: DataTypes.STRING(50),
        },
        fecha_creacion: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        fecha_ultima_edicion: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'ServiciosLocales',
        tableName: 'servicios_locales',
        timestamps: false,
      }
    );
  }
}

module.exports = ServiciosLocales;