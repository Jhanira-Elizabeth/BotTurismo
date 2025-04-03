const { Sequelize, Model, DataTypes } = require('sequelize');
// Sequelize usa migraciones para actualizar los datos
// Tiene rollback para deshacer cambios
const PROVEEDOR_TABLE = 'proveedor'
const sequelize = new Sequelize('sqlite::memory:');

const proveedorSchema = {
    id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RUC: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};
