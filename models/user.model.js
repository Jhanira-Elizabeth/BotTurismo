const { Sequelize, Model, DataTypes } = require('sequelize');
// Sequelize usa migraciones para actualizar los datos
// Tiene rollback para deshacer cambios
const USER_TABLE = 'user'
const sequelize = new Sequelize('sqlite::memory:');

const userSchema = {
    id : {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
