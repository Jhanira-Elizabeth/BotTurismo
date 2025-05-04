const { Pool } = require('pg');
const pool = new Pool({
  host: 'tursd.postgres.database.azure.com',
  user: 'tursd',
  password: 'elizabeth18.',
  database: 'tursd',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function getConnection() {
  return await pool.connect();
}
