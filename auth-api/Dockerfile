# Build stage
FROM golang:1.18 AS build

# Set working directory
WORKDIR /app

# Set environment variables for Go modules
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Copy go.mod and go.sum (if they exist)
COPY go.* ./

# Initialize the Go module if go.mod doesn't exist
RUN if [ ! -f go.mod ]; then \
    go mod init github.com/bortizf/microservice-app-example/tree/master/auth-api; \
    fi

# Copy the source code
COPY . .

# Download dependencies
RUN go mod tidy

# Build the application
RUN go build -o auth-api .

# Runtime stage
FROM alpine:3.16

# Install necessary runtime dependencies
RUN apk --no-cache add ca-certificates

# Set working directory
WORKDIR /root/

# Copy the binary from the build stage
COPY --from=build /app/auth-api .

# Set environment variables with default values
ENV DB_CONNECTION="postgresql://microservice-config_owner:npg_Pj6Bb4zqwhXA@ep-delicate-wave-a8bme6py-pooler.eastus2.azure.neon.tech/microservice-config?sslmode=require"

# Expose the API port
EXPOSE 8000

# Start the application
CMD ["./auth-api"]