FROM golang:1.18 AS builder
WORKDIR /app
COPY . .
FROM alpine:3.18

RUN apk --no-cache add ca-certificates
RUN export GO111MODULE=on
RUN go mod init github.com/Camilin1904/microservice-app-example/tree/master/auth-api
RUN go mod tidy
RUN go build




FROM debian:buster-slim
WORKDIR /root/
COPY --from=builder /app/auth-api .

EXPOSE 8000
CMD ["./auth-api"]