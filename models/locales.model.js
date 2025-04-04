const { Model, DataTypes } = require('sequelize');

class LocalesTuristicos extends Model {
  static associate(models) {
    // Define las relaciones aquí si es necesario
  }

  static initModel(sequelize) {
    LocalesTuristicos.init(
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
        id_dueno: {
          type: DataTypes.INTEGER,
        },
        direccion: {
          type: DataTypes.TEXT,
        },
        latitud: {
          type: DataTypes.FLOAT,
        },
        longitud: {
          type: DataTypes.FLOAT,
        },
        id_parroquia: {
          type: DataTypes.INTEGER,
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
        modelName: 'LocalesTuristicos',
        tableName: 'locales_turisticos',
        timestamps: false,
      }
    );
  }
}

module.exports = LocalesTuristicos;