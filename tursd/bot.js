// bot.js

// Importaciones necesarias de Bot Framework
const { ActivityHandler, MessageFactory } = require('botbuilder');
// Importar node-fetch para hacer llamadas HTTP a tu microservicio Python
const fetch = require('node-fetch');

// --- Importa tus módulos de base de datos Sequelize aquí ---
const { PuntosTuristicos, LocalesTuristicos, ServiciosLocales, ActividadPuntoTuristico, Sequelize } = require('../libs/sequelize');

// Constante para la URL de tu microservicio Python
const ML_SERVICE_URL = 'http://localhost:5001';

class EchoBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super(conversationState, userState);

        // --- Función auxiliar para extraer el nombre del lugar de la consulta ---
        // Esta función intenta ser más precisa en la limpieza del texto.
        function extractPlaceNameFromQuery(fullQuery, queryKeywords) {
            let namePart = fullQuery.toLowerCase(); // Trabajar en minúsculas para limpieza

            // 1. Eliminar las frases de pregunta iniciales (keywords)
            queryKeywords.forEach(kw => {
                // Usamos un regex para que coincida con la palabra clave al inicio, ignorando espacios y mayúsculas/minúsculas.
                namePart = namePart.replace(new RegExp(`^${kw}\\s*`, 'i'), '');
            });

            // 2. Eliminar frases de relleno comunes que pueden venir después de la pregunta y antes del nombre.
            // Ejemplo: "cuanto cuestan las comidas en la casa del hornado?" -> quitar "las comidas en "
            // Ejemplo: "que servicios tiene el parque jelen tenka?" -> quitar "el "
            namePart = namePart.replace(/(las comidas en|la comida en|las comidas|la comida|el|la|los|las|de|del|en|tiene|hay)\s*/g, '').trim();

            // 3. Eliminar caracteres no alfanuméricos al final (como ?)
            namePart = namePart.replace(/[^a-z0-9\s]+$/i, '').trim();

            // 4. Eliminar espacios múltiples
            namePart = namePart.replace(/\s+/g, ' ').trim();

            return namePart;
        }

        // --- Función auxiliar para buscar un lugar por nombre (aproximado) ---
        async function findPlaceByName(nameQuery) {
            try {
                // Intenta buscar en LocalesTuristicos
                let place = await LocalesTuristicos.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('nombre')),
                        'LIKE',
                        `%${nameQuery.toLowerCase()}%` // Búsqueda parcial e insensible a mayúsculas
                    ),
                    raw: true
                });

                if (place) {
                    console.log(`[Bot Debug] Encontrado Local: ${place.nombre}`);
                    return { ...place, type: 'local_turistico' };
                }

                // Si no se encuentra, intenta buscar en PuntosTuristicos
                place = await PuntosTuristicos.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('nombre')),
                        'LIKE',
                        `%${nameQuery.toLowerCase()}%` // Búsqueda parcial e insensible a mayúsculas
                    ),
                    raw: true
                });

                if (place) {
                    console.log(`[Bot Debug] Encontrado Punto: ${place.nombre}`);
                    return { ...place, type: 'punto_turistico' };
                }

                console.log(`[Bot Debug] No se encontró ningún lugar para la consulta: "${nameQuery}"`);
                return null;
            } catch (error) {
                console.error(`[Bot Error] Fallo en findPlaceByName para "${nameQuery}":`, error);
                return null;
            }
        }

        // Este manejador se ejecuta cuando el bot recibe un mensaje del usuario.
        this.onMessage(async (context, next) => {
            const userText = context.activity.text.toLowerCase();

            let recommendations = [];
            let responseMessage = '';
            let handled = false; // Bandera para saber si ya respondimos

            // --- Lógica de Detección de Intenciones: Costo y Servicios ---

            if (userText.includes('cuanto cuesta') || userText.includes('precio de') || userText.includes('costo de')) {
                handled = true;
                const placeNameQuery = extractPlaceNameFromQuery(userText, ['cuanto cuesta', 'precio de', 'costo de']);
                
                try {
                    const place = await findPlaceByName(placeNameQuery);

                    if (place) {
                        console.log(`[Bot] Buscando costos para: ${place.nombre} (${place.type})`);
                        if (place.type === 'local_turistico') {
                            const servicios = await ServiciosLocales.findAll({
                                where: { id_local: place.id },
                                attributes: ['servicio', 'precio'],
                                raw: true
                            });

                            if (servicios.length > 0) {
                                responseMessage = `Estos son algunos costos en **${place.nombre}**:\n\n`;
                                servicios.forEach(s => {
                                    responseMessage += `- ${s.servicio}: ${s.precio !== null ? `$${s.precio}` : 'Gratis'}\n`;
                                });
                            } else {
                                responseMessage = `No tengo información de costos específicos para **${place.nombre}**.`;
                            }
                        } else if (place.type === 'punto_turistico') {
                            const actividades = await ActividadPuntoTuristico.findAll({
                                where: { id_punto_turistico: place.id },
                                attributes: ['actividad', 'precio'],
                                raw: true
                            });

                            if (actividades.length > 0) {
                                responseMessage = `Estas son algunas actividades y sus costos en **${place.nombre}**:\n\n`;
                                actividades.forEach(a => {
                                    responseMessage += `- ${a.actividad}: ${a.precio !== null ? `$${a.precio}` : 'Gratis'}\n`;
                                });
                            } else {
                                responseMessage = `No tengo información de costos o actividades específicas para **${place.nombre}**.`;
                            }
                        }
                    } else {
                        responseMessage = `Lo siento, no pude identificar el lugar para consultar los costos. ¿Podrías ser más específico?`;
                    }
                } catch (error) {
                    console.error(`[Bot Error] Fallo al procesar consulta de costo:`, error);
                    responseMessage = `Lo siento, hubo un error al buscar la información de costos.`;
                }

            } else if (userText.includes('que servicios tiene') || userText.includes('servicios de') || userText.includes('que ofrece')) {
                handled = true;
                const placeNameQuery = extractPlaceNameFromQuery(userText, ['que servicios tiene', 'servicios de', 'que ofrece']);

                try {
                    const place = await findPlaceByName(placeNameQuery);

                    if (place) {
                        console.log(`[Bot] Buscando servicios para: ${place.nombre} (${place.type})`);
                        if (place.type === 'local_turistico') {
                            const servicios = await ServiciosLocales.findAll({
                                where: { id_local: place.id },
                                attributes: ['servicio', 'descripcion'],
                                raw: true
                            });

                            if (servicios.length > 0) {
                                responseMessage = `Estos son los servicios de **${place.nombre}**:\n\n`;
                                servicios.forEach(s => {
                                    responseMessage += `- ${s.servicio}`;
                                    if (s.descripcion) {
                                        responseMessage += `: ${s.descripcion}`;
                                    }
                                    responseMessage += `\n`;
                                });
                            } else {
                                responseMessage = `No tengo información de servicios específicos para **${place.nombre}**.`;
                            }
                        } else if (place.type === 'punto_turistico') {
                            const actividades = await ActividadPuntoTuristico.findAll({
                                where: { id_punto_turistico: place.id },
                                attributes: ['actividad', 'descripcion'],
                                raw: true
                            });

                            if (actividades.length > 0) {
                                responseMessage = `Estas son las actividades en **${place.nombre}**:\n\n`;
                                actividades.forEach(a => {
                                    responseMessage += `- ${a.actividad}`;
                                    if (a.descripcion) {
                                        responseMessage += `: ${a.descripcion}`;
                                    }
                                    responseMessage += `\n`;
                                });
                            } else {
                                responseMessage = `No tengo información de actividades específicas para **${place.nombre}**.`;
                            }
                        }
                    } else {
                        responseMessage = `Lo siento, no pude identificar el lugar para consultar los servicios. ¿Podrías ser más específico?`;
                    }
                } catch (error) {
                    console.error(`[Bot Error] Fallo al procesar consulta de servicios:`, error);
                    responseMessage = `Lo siento, hubo un error al buscar la información de servicios.`;
                }
            }

            // --- Lógica de Detección de Intenciones y Llamada al Microservicio ML (si no se manejó ya) ---
            if (!handled) {
                // Intención 1: Recomendaciones personalizadas (Basado en historial de usuario en Firestore)
                if (userText.includes('recomiéndame') || userText.includes('recomendación personalizada')) {
                    const userId = context.activity.from.id;
                    console.log(`[Bot] Solicitando recomendaciones personalizadas para usuario: ${userId}`);

                    try {
                        const mlResponse = await fetch(`${ML_SERVICE_URL}/recommend`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ user_id: userId })
                        });
                        const data = await mlResponse.json();

                        if (data.recommendations && data.recommendations.length > 0) {
                            recommendations = data.recommendations.map(id => ({ id: id, type: 'punto_turistico' }));
                            responseMessage = `¡Claro! Aquí tienes algunas recomendaciones personalizadas para ti:\n\n`;
                        } else {
                            responseMessage = `Lo siento, no pude encontrar recomendaciones personalizadas para ti en este momento. Intenta agregar algunos favoritos en la app.\n\n`;
                        }
                    } catch (error) {
                        console.error(`[Bot Error] Fallo al conectar con el microservicio ML (SVD):`, error);
                        responseMessage = `Lo siento, tengo problemas para conectarme con mi cerebro de recomendaciones personalizadas. Por favor, inténtalo más tarde.`;
                    }

                }
                // Intención 2: Recomendaciones basadas en contenido (Búsqueda por palabra clave)
                else if (userText.includes('restaurante') || userText.includes('comida') || userText.includes('hambre') || userText.includes('comer') ||
                    userText.includes('parque') || userText.includes('museo') || userText.includes('aventura') || userText.includes('cultura')) {
                    const queryText = userText;
                    console.log(`[Bot] Solicitando recomendaciones de contenido para la consulta: "${queryText}"`);

                    try {
                        const mlResponse = await fetch(`${ML_SERVICE_URL}/recommend_by_content`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query_text: queryText })
                        });
                        const data = await mlResponse.json();

                        if (data.recommendations && data.recommendations.length > 0) {
                            recommendations = data.recommendations;
                            console.log(`[Bot Debug] Recomendaciones recibidas de ML:`, recommendations);
                            responseMessage = `¡Entendido! Aquí tienes algunos lugares relacionados con "${queryText}" que podrían interesarte:\n\n`;
                        } else {
                            responseMessage = `Lo siento, no pude encontrar ningún lugar relacionado con "${queryText}". ¿Podrías probar con otra palabra clave?`;
                        }
                    } catch (error) {
                        console.error(`[Bot Error] Fallo al conectar con el microservicio ML (TF-IDF):`, error);
                        responseMessage = `Lo siento, tengo problemas para conectarme con mi cerebro de recomendaciones. Por favor, inténtalo más tarde.`;
                    }
                }
                // Intención por defecto: Si no reconoce ninguna intención
                else {
                    responseMessage = `Hola, ¿en qué puedo ayudarte hoy? Puedes preguntarme "recomiéndame" para sugerencias personalizadas, o buscar por "restaurante", "parque", etc. También puedo darte información sobre "servicios" o "costos" de un lugar específico.`;
                }

                // --- Obtener Detalles Completos de los Ítems Recomendados desde PostgreSQL (solo si no se manejó ya) ---
                if (recommendations.length > 0) {
                    const itemDetails = [];
                    for (const item of recommendations) {
                        try {
                            let detail = null;
                            if (item.type === 'punto_turistico') {
                                detail = await PuntosTuristicos.findByPk(item.id, { raw: true });
                                if (detail) {
                                    itemDetails.push({
                                        id: detail.id,
                                        nombre: detail.nombre,
                                        descripcion: detail.descripcion,
                                        type: item.type
                                    });
                                }
                            } else if (item.type === 'local_turistico') {
                                detail = await LocalesTuristicos.findByPk(item.id, { raw: true });
                                if (detail) {
                                    itemDetails.push({
                                        id: detail.id,
                                        nombre: detail.nombre,
                                        descripcion: detail.descripcion,
                                        type: item.type
                                    });
                                }
                            }
                        } catch (dbError) {
                            console.error(`[Bot Error] Fallo al obtener detalles de la DB para item ${item.id} (${item.type}):`, dbError);
                        }
                    }

                    if (itemDetails.length > 0) {
                        itemDetails.forEach(detail => {
                            responseMessage += `- **${detail.nombre || `ID: ${detail.id}`}** (${detail.type === 'punto_turistico' ? 'Punto Turístico' : 'Local Turístico'})\n`;
                            if (detail.descripcion) {
                                responseMessage += `  ${detail.descripcion}\n`;
                            }
                            responseMessage += `\n`;
                        });
                    } else {
                        responseMessage = `Encontré algunas recomendaciones, pero no pude obtener sus detalles completos de la base de datos.`;
                    }
                }
            }


            if (responseMessage) {
                await context.sendActivity(MessageFactory.text(responseMessage));
            }


            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('¡Hola! Soy tu bot de recomendaciones turísticas. ¿En qué puedo ayudarte hoy? Puedes preguntarme "recomiéndame" para sugerencias personalizadas, o buscar por "restaurante", "parque", etc. También puedo darte información sobre "servicios" o "costos" de un lugar específico.');
                }
            }
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
