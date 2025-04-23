 # Use the official Zipkin Docker image
FROM openzipkin/zipkin:2.23

# Environment variables for configuration
ENV STORAGE_TYPE=mem \
    # Adjust logging
    JAVA_OPTS="-Xms512m -Xmx512m -XX:+ExitOnOutOfMemoryError" \
    # Use 1 day of retention instead of default 7 days
    SPANS_TTL_DAYS=1

# Expose the web UI port and collection ports
EXPOSE 9411 9410

# Health check to verify the service is running properly
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:9411/health || exit 1

# The container already has an entrypoint defined in the base image