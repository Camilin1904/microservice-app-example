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
ENV POSTGRES_DB='postgresql://microservice-config_owner:npg_Pj6Bb4zqwhXA@ep-delicate-wave-a8bme6py-pooler.eastus2.azure.neon.tech/microservice-config?sslmode=require'


# Expose API port
EXPOSE 8082

# Start the application
CMD ["npm", "start"]