const { Sequelize } = require('sequelize');
const { config } = require('../config/config.js');

const DATABASE_URL = `postgresql://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?sslmode=require`;


const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Desactiva logs innecesarios en producción
});

module.exports = sequelize;
