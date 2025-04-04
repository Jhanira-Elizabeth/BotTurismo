const { Model, DataTypes } = require('sequelize');

class DuenosLocales extends Model {
  static initModel(sequelize) {
    DuenosLocales.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombres: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        apellidos: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cedula: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        telefono: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        correo: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        contrasena: {
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
        modelName: 'DuenosLocales',
        tableName: 'duenos_locales',
        timestamps: false,
      }
    );
  }
}

module.exports = DuenosLocales;