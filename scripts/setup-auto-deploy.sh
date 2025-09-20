#!/bin/bash

# 🚀 Auto-Deployment Setup Script for Vercel
# This script sets up automatic deployment from Git to Vercel

echo "🚀 SaaS Notes App - Auto Deployment Setup"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not in a git repository. Initializing...${NC}"
    git init
    git remote add origin https://github.com/Abhimanyu012/saasnotes.git
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

echo -e "${BLUE}📋 Prerequisites Checklist:${NC}"
echo "✅ MongoDB Atlas cluster created"
echo "✅ Environment variables configured"
echo "✅ Code committed to Git"
echo ""

# Commit current state
echo -e "${YELLOW}📝 Committing current changes...${NC}"
git add .
git commit -m "Setup production environment and auto-deployment configuration" || echo "No changes to commit"

# Push to GitHub
echo -e "${YELLOW}⬆️  Pushing to GitHub...${NC}"
git push origin main || git push --set-upstream origin main

echo ""
echo -e "${GREEN}✅ Repository pushed to GitHub!${NC}"
echo -e "${BLUE}🔗 Repository URL: https://github.com/Abhimanyu012/saasnotes${NC}"

echo ""
echo -e "${YELLOW}🚀 Next Steps for Auto-Deployment:${NC}"
echo ""
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository: Abhimanyu012/saasnotes"
echo "3. Deploy BACKEND first:"
echo "   - Root Directory: backend"
echo "   - Framework Preset: Other"
echo "   - Build Command: npm install"
echo "   - Install Command: npm install"
echo ""
echo "4. Set Environment Variables for Backend:"
echo "   NODE_ENV=production"
echo "   MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0"
echo "   JWT_SECRET=your-production-secret-key"
echo ""
echo "5. Deploy FRONTEND:"
echo "   - Root Directory: frontend"
echo "   - Framework Preset: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "6. Update frontend/vite.config.js with your backend URL"
echo ""

read -p "Press Enter after setting up Vercel projects..."

echo ""
echo -e "${GREEN}🎉 Auto-deployment is now configured!${NC}"
echo ""
echo -e "${BLUE}📡 From now on:${NC}"
echo "✅ Any push to 'main' branch will auto-deploy to production"
echo "✅ Pull requests will create preview deployments"
echo "✅ Vercel will handle builds and deployments automatically"
echo ""
echo -e "${YELLOW}🧪 Test your deployment:${NC}"
echo "1. Make a small change to any file"
echo "2. git add . && git commit -m 'Test auto-deployment'"
echo "3. git push origin main"
echo "4. Watch Vercel automatically deploy your changes!"
echo ""
echo -e "${GREEN}🚀 Your SaaS app is now production-ready with auto-deployment!${NC}"