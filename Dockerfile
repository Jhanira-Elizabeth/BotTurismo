# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de tu proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu proyecto al contenedor
COPY . .

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar tu aplicación
CMD ["npm", "start"]