# 🚀 Quick Start Guide

Get your RAG Document Assistant running in 5 minutes!

## Prerequisites
- Docker and Docker Compose installed
- Google API key (optional, for full AI functionality)

## Option 1: Automated Setup (Recommended)

### Windows:
```cmd
deploy.bat
```

### Linux/macOS:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Option 2: Manual Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd rag-fastapi-project
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env and add your Google API key
   ```

3. **Start the application:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Get Your Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key and add it to your `.env` file

## First Steps

1. **Upload a document** (PDF, DOCX, or HTML)
2. **Go to Chat** and ask questions about your document
3. **Try these example questions:**
   - "Summarize the main points"
   - "What is this document about?"
   - "Find information on [topic]"

## Need Help?

- 📖 **Full Guide:** [USER_GUIDE.md](USER_GUIDE.md)
- 🚀 **Deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 **Troubleshooting:** Check the logs with `docker-compose logs`

## Management Commands

```bash
# View logs
docker-compose logs -f

# Restart application
docker-compose restart

# Stop application
docker-compose down

# Check status
docker-compose ps
```

That's it! You're ready to chat with your documents! 🎉
