# 🤖 RAG Document Assistant

A modern, clean RAG (Retrieval-Augmented Generation) application that lets you chat with your documents using AI. Upload PDFs, DOCX files, or HTML documents and ask questions about their content.

## ✨ Features

- **📄 Document Management**: Upload and manage PDF, DOCX, and HTML documents
- **💬 AI Chat Interface**: Chat with your documents using Google Gemini models
- **🎨 Clean, Modern UI**: Simplified design with dark/light mode support
- **⚡ Real-time Processing**: Upload documents and get instant AI responses
- **💾 Session Management**: Persistent chat sessions and settings
- **🔧 Fully Functional Settings**: All settings work with proper state management
- **🚀 Easy Deployment**: Deploy for free on Railway, Render, or Fly.io

## 🆓 **Deploy for FREE!**

### Quick Deploy to Railway (Recommended)
```bash
# Windows
deploy-railway.bat

# Linux/macOS  
chmod +x deploy-railway.sh
./deploy-railway.sh
```

**Or manually:**
1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Sign up with GitHub
4. Deploy from your repository
5. Add your Google API key
6. Done! Your app is live for FREE!

📖 **Full deployment guide:** [FREE_DEPLOYMENT.md](FREE_DEPLOYMENT.md)

## Quick Start

### Backend (FastAPI)
```bash
cd api
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend (React + Vite)
```bash
cd app
npm install
npm run dev
```

## Recent Improvements

### Fixed Issues
- ✅ **API Connection**: Fixed interface mismatches between frontend and backend
- ✅ **Document Management**: Corrected `file_id` vs `id` field mapping
- ✅ **Error Handling**: Added comprehensive error handling with user-friendly messages
- ✅ **UI Simplification**: Cleaned up complex gradients and custom colors for better maintainability
- ✅ **Consistent Theming**: Standardized color scheme using Tailwind's design system

### UI Improvements
- Simplified color palette using standard Tailwind colors
- Removed complex gradients in favor of clean, modern design
- Improved accessibility and readability
- Consistent spacing and typography
- Better error states and loading indicators

## API Endpoints

- `POST /chat` - Send messages to the AI assistant
- `POST /upload-docs` - Upload documents for processing
- `GET /list-docs` - List all uploaded documents
- `DELETE /delete-docs/{file_id}` - Delete a specific document

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Python, ChromaDB, LangChain
- **AI Models**: Google Gemini 2.5 Flash

## 🚀 **Free Deployment Options**

| Platform | Free Tier | Best For | Setup Time |
|----------|-----------|----------|------------|
| **Railway** | $5 credit/month | Easiest deployment | 2 minutes |
| **Render** | 750 hours/month | Most generous | 3 minutes |
| **Fly.io** | 3 VMs, 256MB each | Docker apps | 5 minutes |
| **Vercel** | Unlimited static | Frontend + API | 2 minutes |

## 📚 **Documentation**

- 📖 **[User Guide](USER_GUIDE.md)** - Complete user manual
- 🚀 **[Deployment Guide](DEPLOYMENT.md)** - Full deployment instructions  
- 🆓 **[Free Deployment](FREE_DEPLOYMENT.md)** - Deploy for free
- ⚡ **[Quick Start](QUICK_START.md)** - 5-minute setup

## 🔧 **Development**

The application runs locally with:
- **Frontend:** http://localhost:8080 (or 8081)
- **Backend API:** http://127.0.0.1:8000
- **API Docs:** http://127.0.0.1:8000/docs

Both servers support hot reloading for development.

## 🎯 **Perfect For**

- **Researchers** - Chat with academic papers and research documents
- **Students** - Create study guides from textbooks and notes  
- **Professionals** - Analyze contracts, reports, and documentation
- **Content Creators** - Generate summaries and insights from source materials
- **Anyone** - Who wants to chat with their documents using AI!

## 🎉 **Ready to Deploy?**

Your RAG application is now ready for free deployment! Choose your platform and get started:

1. **Railway** (Recommended) - Easiest and most reliable
2. **Render** - Most generous free tier
3. **Fly.io** - Best for Docker
4. **Vercel** - Great for frontend + serverless

**Start with Railway for the best experience!** 🚀
