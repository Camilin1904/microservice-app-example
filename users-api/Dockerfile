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

# Command to run the application
ENTRYPOINT ["java", "-jar", "users-api.jar"]