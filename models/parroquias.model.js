const { Model, DataTypes } = require('sequelize');

class Parroquias extends Model {
  static initModel(sequelize) {
    Parroquias.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fecha_fundacion: {
          type: DataTypes.STRING,
        },
        poblacion: {
          type: DataTypes.STRING,
        },
        temperatura: {
          type: DataTypes.STRING,
        },
        descripcion: {
          type: DataTypes.TEXT,
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
        modelName: 'Parroquias',
        tableName: 'parroquias',
        timestamps: false,
      }
    );
  }
}

module.exports = Parroquias;