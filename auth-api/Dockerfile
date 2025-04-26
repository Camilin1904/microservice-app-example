FROM golang:1.18 AS builder
WORKDIR /app
COPY . .



RUN export GO111MODULE=on
RUN go mod init github.com/Camilin1904/microservice-app-example/tree/master/auth-api
RUN go mod tidy



FROM alpine:3.18

RUN apk --no-cache add ca-certificates

FROM debian:buster-slim
WORKDIR /root/
COPY --from=builder /app/auth-api .



RUN go build

EXPOSE 8000
CMD ["./auth-api"]