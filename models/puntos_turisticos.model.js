const { Model, DataTypes } = require('sequelize');

class PuntosTuristicos extends Model {
  static initModel(sequelize) {
    PuntosTuristicos.init(
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
        descripcion: {
          type: DataTypes.TEXT,
        },
        latitud: {
          type: DataTypes.FLOAT,
        },
        longitud: {
          type: DataTypes.FLOAT,
        },
        estado: {
          type: DataTypes.STRING(50),
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
        modelName: 'PuntosTuristicos',
        tableName: 'puntos_turisticos',
        timestamps: false,
      }
    );
  }
}

module.exports = PuntosTuristicos;