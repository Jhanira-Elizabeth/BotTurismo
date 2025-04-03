const { Sequelize } = require('sequelize');
//Da acceso a la base de datos
const { config } = require('./../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//El objeto Sequelize con parametros para que sirva como constructor 
//Se conecta automaticamente a la BDD los parametros que van directo al constructor

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

module.exports = sequelize;