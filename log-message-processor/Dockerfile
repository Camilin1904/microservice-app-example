# Use Python 3.6 as specified in the README
FROM python:3.6-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Cython first since it's needed for building other packages
RUN pip3 install cython

# Install dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy application code
COPY main.py .

# Command to run the application
CMD ["python3", "main.py"]