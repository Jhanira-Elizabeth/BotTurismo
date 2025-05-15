const { Model, DataTypes } = require('sequelize');

class PuntoEtiqueta extends Model {
  static initModel(sequelize) {
    PuntoEtiqueta.init(
      {
        id_punto_turistico: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_etiqueta: {
          type: DataTypes.INTEGER,
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
        modelName: 'PuntoEtiqueta',
        tableName: 'punto_etiqueta',
        timestamps: false,
      }
    );
  }
}

module.exports = PuntoEtiqueta;