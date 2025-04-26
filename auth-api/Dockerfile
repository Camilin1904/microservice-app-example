# Build stage
FROM golang:1.18 AS builder
WORKDIR /app
COPY . .
RUN export GO111MODULE=on
RUN go mod init github.com/Camilin1904/microservice-app-example/tree/master/auth-api
RUN go mod tidy
RUN go build

# Final stage
FROM debian:buster-slim
WORKDIR /root/

# Install CA certificates in the final image
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy the built binary from the builder stage
COPY --from=builder /app/auth-api .

EXPOSE 8000
CMD ["./auth-api"]