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

# Build the application :(
RUN go build -o auth-api

# Final stage
FROM alpine:latest

# Set working directory
WORKDIR /root/

# Copy the binary from the build stage
COPY --from=build /app/auth-api .

# Set environment variables with default values
ENV JWT_SECRET=PRFT \
    AUTH_API_PORT=8000 \
    USERS_API_ADDRESS=http://users-api:8083

# Expose the API port
EXPOSE 8000

# Start the application
CMD ["./auth-api"]