#!/bin/bash

# RAG Application Setup Script
# This script helps users set up their own instance of the RAG application

set -e

echo "🎯 RAG Document Assistant - Setup Wizard"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
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

# Check prerequisites
print_step "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first:"
    echo "  - Windows: https://docs.docker.com/desktop/windows/install/"
    echo "  - macOS: https://docs.docker.com/desktop/mac/install/"
    echo "  - Linux: https://docs.docker.com/engine/install/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker and Docker Compose are installed"

# Get Google API Key
print_step "Setting up Google API Key..."

if [ ! -f .env ]; then
    cp env.example .env
    print_warning "Created .env file from template"
fi

echo ""
echo "To use the full AI functionality, you need a Google API key."
echo "You can get one for free at: https://aistudio.google.com/"
echo ""

read -p "Do you have a Google API key? (y/n): " has_api_key

if [[ $has_api_key =~ ^[Yy]$ ]]; then
    read -p "Enter your Google API key: " api_key
    
    if [ ! -z "$api_key" ]; then
        # Update .env file with the API key
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/GOOGLE_API_KEY=.*/GOOGLE_API_KEY=$api_key/" .env
        else
            # Linux
            sed -i "s/GOOGLE_API_KEY=.*/GOOGLE_API_KEY=$api_key/" .env
        fi
        print_success "Google API key configured"
    else
        print_warning "No API key provided. Application will run in test mode."
    fi
else
    print_warning "No API key provided. Application will run in test mode."
    echo "You can add an API key later by editing the .env file"
fi

# Create data directories
print_step "Creating data directories..."
mkdir -p data/uploads
mkdir -p data/chroma_db
mkdir -p data/user_data
mkdir -p data/logs

print_success "Data directories created"

# Set permissions
chmod 755 data/uploads
chmod 755 data/chroma_db
chmod 755 data/user_data
chmod 755 data/logs

# Build and start the application
print_step "Building and starting the application..."
docker-compose build
docker-compose up -d

# Wait for the application to start
print_step "Waiting for application to start..."
sleep 15

# Check if the application is running
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    print_success "Application is running successfully!"
    echo ""
    echo "🎉 Setup Complete!"
    echo "=================="
    echo ""
    echo "Your RAG Document Assistant is now running at:"
    echo "  📱 Frontend: http://localhost:8000"
    echo "  📚 API Docs: http://localhost:8000/docs"
    echo "  ❤️  Health: http://localhost:8000/health"
    echo ""
    echo "Next steps:"
    echo "  1. Open http://localhost:8000 in your browser"
    echo "  2. Upload some documents (PDF, DOCX, HTML)"
    echo "  3. Start chatting with your documents!"
    echo ""
    echo "Management commands:"
    echo "  📊 View logs: docker-compose logs -f"
    echo "  🔄 Restart: docker-compose restart"
    echo "  🛑 Stop: docker-compose down"
    echo "  📈 Status: docker-compose ps"
    echo ""
else
    print_error "Application failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Show recent logs
print_step "Recent application logs:"
docker-compose logs --tail=10
