const { Model, DataTypes } = require('sequelize');

class LocalEtiqueta extends Model {
  static initModel(sequelize) {
    LocalEtiqueta.init(
      {
        id_local: {
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
        modelName: 'LocalEtiqueta',
        tableName: 'local_etiqueta',
        timestamps: false,
      }
    );
  }
}

module.exports = LocalEtiqueta;