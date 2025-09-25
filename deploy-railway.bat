@echo off
REM Railway Deployment Script for Windows
REM This script helps you deploy to Railway for free

echo 🚀 Deploying RAG Application to Railway (FREE!)
echo ==============================================

REM Check if git is initialized
if not exist ".git" (
    echo [STEP] Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - RAG Document Assistant"
    echo [SUCCESS] Git repository initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] No GitHub remote found. You need to:
    echo 1. Create a repository on GitHub
    echo 2. Add it as remote: git remote add origin https://github.com/yourusername/your-repo.git
    echo 3. Push your code: git push -u origin main
    echo.
    set /p has_repo="Have you created a GitHub repository? (y/n): "
    
    if /i "%has_repo%"=="y" (
        set /p repo_url="Enter your GitHub repository URL: "
        git remote add origin "%repo_url%"
        git push -u origin main
        echo [SUCCESS] Code pushed to GitHub
    ) else (
        echo [ERROR] Please create a GitHub repository first at https://github.com/new
        pause
        exit /b 1
    )
) else (
    echo [STEP] Pushing latest changes to GitHub...
    git add .
    git commit -m "Update for Railway deployment" 2>nul || echo No changes to commit
    git push origin main
    echo [SUCCESS] Code pushed to GitHub
)

echo.
echo [SUCCESS] Your code is now on GitHub!
echo.
echo 🎯 Next Steps for Railway Deployment:
echo =====================================
echo.
echo 1. 🌐 Go to https://railway.app
echo 2. 🔐 Sign up with your GitHub account
echo 3. ➕ Click 'New Project' → 'Deploy from GitHub repo'
echo 4. 📁 Select your repository
echo 5. ⚙️  Add environment variable:
echo    - Key: GOOGLE_API_KEY
echo    - Value: your_google_api_key_here
echo 6. 🚀 Railway will automatically deploy your app!
echo.
echo 📱 Your app will be live at: https://your-app-name.railway.app
echo.
echo 🎉 That's it! Your RAG app will be deployed for FREE!
echo.
echo 💡 Pro Tips:
echo - Railway gives you $5 free credit monthly
echo - Your app will have automatic HTTPS
echo - You can add a custom domain later
echo - All your data (documents, settings) will persist
echo.
echo [SUCCESS] Ready for Railway deployment! 🚀

pause
