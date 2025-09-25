@echo off
echo Starting RAG System...
echo.

REM Clear any existing GOOGLE_API_KEY from environment
set GOOGLE_API_KEY=

echo Loading API keys from _env file...
python load_env.py

echo.
echo Starting the backend server...
cd api
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
