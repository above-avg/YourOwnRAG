# 🆓 Free Deployment Guide

Deploy your RAG Document Assistant completely free! Here are the best options:

## 🚀 **Option 1: Railway (Recommended - Easiest)**

### Why Railway?
- ✅ **$5 free credit monthly** (enough for small apps)
- ✅ **Zero configuration** needed
- ✅ **Automatic deployments** from GitHub
- ✅ **Built-in databases** and storage
- ✅ **Custom domains** included

### Deploy to Railway:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Railway.app](https://railway.app)**
3. **Sign up with GitHub**
4. **Click "New Project" → "Deploy from GitHub repo"**
5. **Select your repository**
6. **Railway will automatically detect the Dockerfile and deploy!**

7. **Add your Google API key:**
   - Go to your project dashboard
   - Click "Variables" tab
   - Add: `GOOGLE_API_KEY` = `your_api_key_here`

8. **Your app will be live at:** `https://your-app-name.railway.app`

---

## 🎯 **Option 2: Render (Most Generous Free Tier)**

### Why Render?
- ✅ **750 hours/month free** (enough for 24/7)
- ✅ **512MB RAM** free
- ✅ **Automatic SSL** certificates
- ✅ **Custom domains** free
- ✅ **Zero downtime** deployments

### Deploy to Render:

1. **Push your code to GitHub** (same as above)

2. **Go to [Render.com](https://render.com)**
3. **Sign up with GitHub**
4. **Click "New" → "Web Service"**
5. **Connect your GitHub repository**
6. **Configure:**
   - **Name:** `rag-document-assistant`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `./Dockerfile`
   - **Plan:** `Free`

7. **Add environment variables:**
   - `GOOGLE_API_KEY` = `your_api_key_here`

8. **Click "Create Web Service"**
9. **Your app will be live at:** `https://your-app-name.onrender.com`

---

## 🛩️ **Option 3: Fly.io (Best for Docker)**

### Why Fly.io?
- ✅ **3 shared-cpu VMs** free
- ✅ **256MB RAM** per VM
- ✅ **Global edge** deployment
- ✅ **Excellent Docker** support
- ✅ **Custom domains** free

### Deploy to Fly.io:

1. **Install Fly CLI:**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly:**
   ```bash
   fly auth login
   ```

3. **Deploy:**
   ```bash
   fly deploy
   ```

4. **Set environment variables:**
   ```bash
   fly secrets set GOOGLE_API_KEY=your_api_key_here
   ```

5. **Your app will be live at:** `https://your-app-name.fly.dev`

---

## ⚡ **Option 4: Vercel (Frontend + Serverless)**

### Why Vercel?
- ✅ **Unlimited static sites** free
- ✅ **100GB bandwidth** free
- ✅ **Serverless functions** free
- ✅ **Automatic deployments**
- ✅ **Global CDN**

### Deploy to Vercel:

1. **Create `vercel.json`:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "app/package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "dist" }
       },
       {
         "src": "api/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       { "src": "/api/(.*)", "dest": "/api/main.py" },
       { "src": "/(.*)", "dest": "/app/dist/$1" }
     ]
   }
   ```

2. **Go to [Vercel.com](https://vercel.com)**
3. **Import your GitHub repository**
4. **Deploy automatically**

---

## 🏆 **My Recommendation: Railway**

For your RAG application, I recommend **Railway** because:

1. **Easiest setup** - Just connect GitHub and deploy
2. **Perfect for your Docker setup** - Works out of the box
3. **Generous free tier** - $5 credit monthly
4. **Persistent storage** - Your documents and data persist
5. **Custom domains** - Professional URLs
6. **Automatic HTTPS** - Secure by default

## 📋 **Quick Start with Railway:**

1. **Push your code to GitHub**
2. **Go to [Railway.app](https://railway.app)**
3. **Sign up with GitHub**
4. **Deploy from GitHub repo**
5. **Add your Google API key in Variables**
6. **Done!** Your app is live and free!

## 🔧 **Environment Variables to Set:**

```env
GOOGLE_API_KEY=your_google_api_key_here
PORT=8000
```

## 📊 **Free Tier Limits Comparison:**

| Platform | Free Tier | Best For |
|----------|-----------|----------|
| **Railway** | $5 credit/month | Easiest deployment |
| **Render** | 750 hours/month | Most generous |
| **Fly.io** | 3 VMs, 256MB each | Docker apps |
| **Vercel** | Unlimited static | Frontend + API |

## 🎉 **After Deployment:**

Your RAG application will be:
- ✅ **Publicly accessible** via URL
- ✅ **Persistent storage** for documents
- ✅ **Individual API keys** for each user
- ✅ **Automatic HTTPS** security
- ✅ **Custom domain** support
- ✅ **Zero maintenance** required

## 🆘 **Need Help?**

- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Fly.io Docs:** [fly.io/docs](https://fly.io/docs)

**Start with Railway - it's the easiest and most reliable for your use case!** 🚀
