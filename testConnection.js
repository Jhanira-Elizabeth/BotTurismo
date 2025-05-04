const sequelize = require('./libs/sequelize');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

testConnection();
