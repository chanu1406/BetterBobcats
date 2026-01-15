# Python Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app

# Expose port (Railway will set PORT env variable)
EXPOSE 8000

# Run the application (production mode - no reload)
# Railway will inject the PORT environment variable
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
