# Build stage
FROM maven:3.8-openjdk-8 AS build
WORKDIR /app

# Copy the Maven wrapper files first
COPY . .


# Download dependencies if needed (this step can be cached)

# Build the application
RUN mvn clean install -DskipTests

# Runtime stage
FROM openjdk:8-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR from build stage
COPY --from=build /app/target/users-api-0.0.1-SNAPSHOT.jar ./users-api.jar

# Set required environment variables
ARG ZIPKIN_URL
ENV ZIPKIN_URL=$ZIPKIN_URL
ENV JWT_SECRET=PRFT
ENV SERVER_PORT=8083

# Expose the port
EXPOSE 8083

# Command to run the application
ENTRYPOINT ["java", "-jar", "users-api.jar"]