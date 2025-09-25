#!/bin/bash

# Railway Deployment Script
# This script helps you deploy to Railway for free

set -e

echo "🚀 Deploying RAG Application to Railway (FREE!)"
echo "=============================================="

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

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_step "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - RAG Document Assistant"
    print_success "Git repository initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No GitHub remote found. You need to:"
    echo "1. Create a repository on GitHub"
    echo "2. Add it as remote: git remote add origin https://github.com/yourusername/your-repo.git"
    echo "3. Push your code: git push -u origin main"
    echo ""
    read -p "Have you created a GitHub repository? (y/n): " has_repo
    
    if [[ $has_repo =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub repository URL: " repo_url
        git remote add origin "$repo_url"
        git push -u origin main
        print_success "Code pushed to GitHub"
    else
        print_error "Please create a GitHub repository first at https://github.com/new"
        exit 1
    fi
else
    print_step "Pushing latest changes to GitHub..."
    git add .
    git commit -m "Update for Railway deployment" || echo "No changes to commit"
    git push origin main
    print_success "Code pushed to GitHub"
fi

echo ""
print_success "Your code is now on GitHub!"
echo ""
echo "🎯 Next Steps for Railway Deployment:"
echo "====================================="
echo ""
echo "1. 🌐 Go to https://railway.app"
echo "2. 🔐 Sign up with your GitHub account"
echo "3. ➕ Click 'New Project' → 'Deploy from GitHub repo'"
echo "4. 📁 Select your repository"
echo "5. ⚙️  Add environment variable:"
echo "   - Key: GOOGLE_API_KEY"
echo "   - Value: your_google_api_key_here"
echo "6. 🚀 Railway will automatically deploy your app!"
echo ""
echo "📱 Your app will be live at: https://your-app-name.railway.app"
echo ""
echo "🎉 That's it! Your RAG app will be deployed for FREE!"
echo ""
echo "💡 Pro Tips:"
echo "- Railway gives you $5 free credit monthly"
echo "- Your app will have automatic HTTPS"
echo "- You can add a custom domain later"
echo "- All your data (documents, settings) will persist"
echo ""
print_success "Ready for Railway deployment! 🚀"
