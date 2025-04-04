const { Model, DataTypes } = require('sequelize');

class HorariosAtencion extends Model {
  static initModel(sequelize) {
    HorariosAtencion.init(
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
        dia: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hora_inicio: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        hora_fin: {
          type: DataTypes.TIME,
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
        modelName: 'HorariosAtencion',
        tableName: 'horarios_atencion',
        timestamps: false,
      }
    );
  }
}

module.exports = HorariosAtencion;