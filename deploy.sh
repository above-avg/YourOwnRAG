#!/bin/bash

# RAG Application Deployment Script
# This script deploys the RAG application using Docker

set -e

echo "🚀 Starting RAG Application Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create data directories
print_status "Creating data directories..."
mkdir -p data/uploads
mkdir -p data/chroma_db
mkdir -p data/user_data

# Set permissions
chmod 755 data/uploads
chmod 755 data/chroma_db
chmod 755 data/user_data

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from example..."
    cp env.example .env
    print_warning "Please edit .env file and add your Google API key before continuing."
    print_warning "You can edit it with: nano .env"
    read -p "Press Enter to continue after editing .env file..."
fi

# Build and start the application
print_status "Building Docker image..."
docker-compose build

print_status "Starting application..."
docker-compose up -d

# Wait for the application to start
print_status "Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    print_success "Application is running successfully!"
    print_success "Frontend: http://localhost:8000"
    print_success "API Docs: http://localhost:8000/docs"
    print_success "Health Check: http://localhost:8000/health"
else
    print_error "Application failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Show logs
print_status "Showing application logs..."
docker-compose logs --tail=20

print_success "Deployment completed! 🎉"
print_status "To stop the application: docker-compose down"
print_status "To view logs: docker-compose logs -f"
print_status "To restart: docker-compose restart"
