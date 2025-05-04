const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'tursd.postgres.database.azure.com', // Cambia localhost por el host de Azure
    port: 5432, // Puerto de PostgreSQL en Azure
    user: 'tursd', // Usuario de la base de datos
    password: 'elizabeth18.', // Contraseña de la base de datos
    database: 'tursd', // Nombre de la base de datos
    ssl: { rejectUnauthorized: false } // Necesario para conexiones seguras en Azure
  });

  await client.connect();
  return client;
}

module.exports = { getConnection };
