const { Sequelize } = require('sequelize');
const { config } = require('../config/config.js');

const sequelize = new Sequelize({
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPass,
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;