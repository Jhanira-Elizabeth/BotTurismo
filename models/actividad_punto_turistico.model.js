const { Model, DataTypes } = require('sequelize');

class ActividadPuntoTuristico extends Model {
  static initModel(sequelize) {
    ActividadPuntoTuristico.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_punto: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        precio: {
          type: DataTypes.FLOAT,
          allowNull: true,
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
        descripcion: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: 'ActividadPuntoTuristico',
        tableName: 'actividad_punto_turistico',
        timestamps: false,
      }
    );
  }
}

module.exports = ActividadPuntoTuristico;