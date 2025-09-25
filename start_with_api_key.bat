@echo off
echo Setting up Google API Key for RAG System...
echo.

REM Check if API key is already set
if defined GOOGLE_API_KEY (
    echo API key is already set: %GOOGLE_API_KEY:~0,10%...
) else (
    echo Please enter your Google API key:
    echo 1. Go to: https://makersuite.google.com/app/apikey
    echo 2. Sign in and create an API key
    echo 3. Copy the key and paste it below
    echo.
    set /p GOOGLE_API_KEY="Enter your Google API key: "
)

echo.
echo Starting the backend server...
cd api
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
