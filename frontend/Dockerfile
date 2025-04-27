# Usa una imagen oficial de Node.js compatible con la versión especificada
FROM node:8.17.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar el cache
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

RUN node config/load-env.js
# Construye la aplicación
RUN npm run build


# Comando para iniciar la app
CMD ["npm", "start"]