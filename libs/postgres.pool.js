const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa la variable de entorno
  ssl: {
    rejectUnauthorized: false // Importante para Azure
  }
});

module.exports = pool;
