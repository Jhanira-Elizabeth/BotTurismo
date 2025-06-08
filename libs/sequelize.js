// libs/sequelize.js
const { Sequelize, DataTypes } = require('sequelize'); // Importa Sequelize aquí
const path = require('path');

// Muestra las variables de entorno para depuración.
console.log('--- Configuración de DB para Sequelize ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
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
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// --- Importar y Definir los Modelos Existentes ---
const modelDefinitionsPath = path.join(__dirname, '../models');

// Importar las CLASES de los modelos
const PuntosTuristicosClass = require(path.join(modelDefinitionsPath, 'puntos_turisticos.model.js'));
const LocalesTuristicosClass = require(path.join(modelDefinitionsPath, 'locales.model.js'));
const ServiciosLocalesClass = require(path.join(modelDefinitionsPath, 'servicios_locales.model.js'));
const ActividadPuntoTuristicoClass = require(path.join(modelDefinitionsPath, 'actividad_punto_turistico.model.js'));

// Inicializar los modelos con la instancia de Sequelize y DataTypes
PuntosTuristicosClass.initModel(sequelize);
LocalesTuristicosClass.initModel(sequelize);
ServiciosLocalesClass.initModel(sequelize);
ActividadPuntoTuristicoClass.initModel(sequelize);

// Acceder a los modelos inicializados desde la instancia de Sequelize
const PuntosTuristicos = sequelize.models.PuntosTuristicos;
const LocalesTuristicos = sequelize.models.LocalesTuristicos;
const ServiciosLocales = sequelize.models.ServiciosLocales;
const ActividadPuntoTuristico = sequelize.models.ActividadPuntoTuristico;


// --- Definir las Asociaciones ---
LocalesTuristicos.hasMany(ServiciosLocales, { foreignKey: 'id_local', as: 'servicios' });
ServiciosLocales.belongsTo(LocalesTuristicos, { foreignKey: 'id_local', as: 'local' });

PuntosTuristicos.hasMany(ActividadPuntoTuristico, { foreignKey: 'id_punto_turistico', as: 'actividades' });
ActividadPuntoTuristico.belongsTo(PuntosTuristicos, { foreignKey: 'id_punto_turistico', as: 'puntoTuristico' });

Object.values(sequelize.models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(sequelize.models));


sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// --- Exportar la instancia de Sequelize, los modelos y la CLASE Sequelize ---
module.exports = {
    sequelize,
    PuntosTuristicos,
    LocalesTuristicos,
    ServiciosLocales,
    ActividadPuntoTuristico,
    DataTypes,
    Sequelize // <--- ¡CLAVE! Ahora exportamos la clase Sequelize
};
