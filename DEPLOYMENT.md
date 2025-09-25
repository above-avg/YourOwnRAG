# 🚀 RAG Application Deployment Guide

This guide will help you deploy the RAG Document Assistant so others can use it with their own API keys and local file storage.

## 📋 Prerequisites

- **Docker** and **Docker Compose** installed
- **Google API Key** (for full AI functionality)
- **Internet connection** (for initial setup)

## 🎯 Deployment Options

### Option 1: Quick Docker Deployment (Recommended)

#### For Linux/macOS:
```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

#### For Windows:
```cmd
# Run the deployment script
deploy.bat
```

### Option 2: Manual Docker Deployment

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd rag-fastapi-project
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Edit the environment file:**
   ```bash
   nano .env  # or use your preferred editor
   ```
   
   Add your Google API key:
   ```
   GOOGLE_API_KEY=your_actual_google_api_key_here
   ```

4. **Create data directories:**
   ```bash
   mkdir -p data/uploads data/chroma_db data/user_data
   ```

5. **Build and start the application:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

6. **Verify deployment:**
   ```bash
   curl http://localhost:8000/health
   ```

## 🌐 Accessing the Application

Once deployed, the application will be available at:

- **Frontend Interface:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

## 🔧 Configuration

### Environment Variables

Edit the `.env` file to configure:

```env
# Required: Google API Key for AI functionality
GOOGLE_API_KEY=your_google_api_key_here

# Optional: Application settings
APP_NAME=RAG Document Assistant
DEBUG=false
MAX_FILE_SIZE=10485760  # 10MB
```

### Data Persistence

The application stores data in the following directories:
- `data/uploads/` - Uploaded documents
- `data/chroma_db/` - Vector database
- `data/user_data/` - User settings and chat history

## 👥 Multi-User Setup

### For Multiple Users on Same Server

1. **Deploy the application** using the steps above
2. **Share the URL** with users (e.g., http://your-server-ip:8000)
3. **Each user can:**
   - Upload their own documents
   - Use their own Google API key (set in browser settings)
   - Have separate chat sessions

### For Individual User Deployments

Each user can deploy their own instance:

1. **Share the repository** with users
2. **Users follow the deployment steps** above
3. **Each user configures** their own Google API key
4. **Data is stored locally** on each user's machine

## 🔐 Security Considerations

### For Production Deployment

1. **Update CORS settings** in `api/main.py`:
   ```python
   allow_origins=["https://yourdomain.com"]  # Replace with your domain
   ```

2. **Use HTTPS** with a reverse proxy (nginx)
3. **Set up authentication** if needed
4. **Regular backups** of the `data/` directory

### API Key Security

- **Never commit** API keys to version control
- **Use environment variables** for sensitive data
- **Rotate API keys** regularly
- **Monitor API usage** in Google Cloud Console

## 📊 Monitoring and Maintenance

### Health Monitoring

```bash
# Check application status
curl http://localhost:8000/health

# View logs
docker-compose logs -f

# Check resource usage
docker stats
```

### Backup Data

```bash
# Backup all user data
tar -czf rag-backup-$(date +%Y%m%d).tar.gz data/

# Restore from backup
tar -xzf rag-backup-YYYYMMDD.tar.gz
```

### Updates

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 8000 already in use:**
   ```bash
   # Change port in docker-compose.yml
   ports:
     - "8001:8000"  # Use port 8001 instead
   ```

2. **Permission denied errors:**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER data/
   chmod -R 755 data/
   ```

3. **API key not working:**
   - Verify the key is correct in `.env`
   - Check Google Cloud Console for API restrictions
   - Ensure the API is enabled

4. **Documents not uploading:**
   - Check file size limits
   - Verify file format (PDF, DOCX, HTML only)
   - Check disk space

### Logs and Debugging

```bash
# View application logs
docker-compose logs rag-app

# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f
```

## 🌍 Cloud Deployment

### AWS/Azure/GCP

1. **Create a VM** with Docker installed
2. **Clone the repository** on the VM
3. **Follow deployment steps** above
4. **Configure firewall** to allow port 8000
5. **Set up domain** and SSL certificate

### Docker Swarm/Kubernetes

For production-scale deployments, consider:
- **Docker Swarm** for simple orchestration
- **Kubernetes** for advanced features
- **Load balancers** for high availability
- **Persistent volumes** for data storage

## 📞 Support

If you encounter issues:

1. **Check the logs** first
2. **Verify all prerequisites** are met
3. **Test with a simple document** upload
4. **Check network connectivity** and firewall settings

## 🎉 Success!

Once deployed, users can:

- ✅ Upload their own documents (PDF, DOCX, HTML)
- ✅ Chat with their documents using AI
- ✅ Manage their document library
- ✅ Use their own Google API keys
- ✅ Have persistent data storage
- ✅ Access from any device on the network

The application is now ready for multi-user access with individual API keys and local file storage!
