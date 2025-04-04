const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true, // Cambia a false si no quieres ver los logs de las consultas SQL
});

module.exports = { sequelize }; // Exporta como un objeto