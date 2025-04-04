const { Model, DataTypes } = require('sequelize');

class EtiquetasTuristicas extends Model {
  static initModel(sequelize) {
    EtiquetasTuristicas.init(
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
        estado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
        modelName: 'EtiquetasTuristicas',
        tableName: 'etiquetas_turisticas',
        timestamps: false,
      }
    );
  }
}

module.exports = EtiquetasTuristicas;