# Use Node 8.17.0 as specified in README
FROM node:8.17.0

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Set environment variables with default values
ARG ZIPKIN_URL
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_CHANNEL
ENV TODO_API_PORT=8082 \
    JWT_SECRET=PRFT \
    REDIS_HOST=$REDIS_HOST \
    REDIS_PORT=$REDIS_PORT \
    REDIS_CHANNEL=$REDIS_CHANNEL \
    ZIPKIN_URL=$ZIPKIN_URL

# Expose API port
EXPOSE 8082

# Start the application
CMD ["npm", "start"]