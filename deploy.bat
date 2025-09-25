@echo off
REM RAG Application Deployment Script for Windows
REM This script deploys the RAG application using Docker

echo 🚀 Starting RAG Application Deployment...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Create data directories
echo [INFO] Creating data directories...
if not exist "data\uploads" mkdir "data\uploads"
if not exist "data\chroma_db" mkdir "data\chroma_db"
if not exist "data\user_data" mkdir "data\user_data"

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found. Creating from example...
    copy "env.example" ".env"
    echo [WARNING] Please edit .env file and add your Google API key before continuing.
    echo [WARNING] You can edit it with: notepad .env
    pause
)

REM Build and start the application
echo [INFO] Building Docker image...
docker-compose build

echo [INFO] Starting application...
docker-compose up -d

REM Wait for the application to start
echo [INFO] Waiting for application to start...
timeout /t 10 /nobreak >nul

REM Check if the application is running
curl -f http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Application is running successfully!
    echo [SUCCESS] Frontend: http://localhost:8000
    echo [SUCCESS] API Docs: http://localhost:8000/docs
    echo [SUCCESS] Health Check: http://localhost:8000/health
) else (
    echo [ERROR] Application failed to start. Check logs with: docker-compose logs
    pause
    exit /b 1
)

REM Show logs
echo [INFO] Showing application logs...
docker-compose logs --tail=20

echo [SUCCESS] Deployment completed! 🎉
echo [INFO] To stop the application: docker-compose down
echo [INFO] To view logs: docker-compose logs -f
echo [INFO] To restart: docker-compose restart

pause
