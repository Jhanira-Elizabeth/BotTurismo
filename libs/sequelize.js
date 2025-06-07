// libs/sequelize.js
const { Sequelize } = require('sequelize');

// Muestra las variables de entorno para depuración.
// Esto es crucial para saber qué valores está usando realmente Node.js.
console.log('--- Configuración de DB para Sequelize ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // ¡Este es el valor clave!
console.log('DB_NAME:', process.env.DB_NAME);
console.log('---------------------------------------');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false // MUY importante: deshabilitar SSL para conexión local a Docker
    },
    logging: console.log, // Mantener los logs de Sequelize para ver su actividad
    pool: { // Configuración del pool de conexiones para PostgreSQL
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;