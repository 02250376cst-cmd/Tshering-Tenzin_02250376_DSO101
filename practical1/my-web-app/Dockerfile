# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy dependency file and install packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Expose port 5000
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]