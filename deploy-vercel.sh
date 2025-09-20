#!/bin/bash

# Vercel Deployment Script
# This script helps deploy both frontend and backend to Vercel

echo "🚀 Starting Vercel Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

echo -e "${BLUE}📋 Please follow these steps:${NC}"
echo ""

echo -e "${YELLOW}Step 1: Deploy Backend${NC}"
echo "cd backend && vercel --prod"
echo ""

echo -e "${YELLOW}Step 2: Set Backend Environment Variables in Vercel Dashboard:${NC}"
echo "NODE_ENV=production"
echo "MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0"
echo "JWT_SECRET=85b3bec6054d6ffcfc8528e11f2b7a2ceb06bee0e0c53e66590d357767a762b61bf9f3b653b645c06fc3cefcb07ee8863d038f57449af10d84764e00e5a5df5b"
echo "ALLOWED_ORIGINS=https://your-frontend-url.vercel.app"
echo ""

echo -e "${YELLOW}Step 3: Deploy Frontend${NC}"
echo "cd frontend && vercel --prod"
echo ""

echo -e "${YELLOW}Step 4: Set Frontend Environment Variables in Vercel Dashboard:${NC}"
echo "VITE_API_URL=https://your-backend-url.vercel.app"
echo ""

echo -e "${YELLOW}Step 5: Update CORS${NC}"
echo "Update backend ALLOWED_ORIGINS with actual frontend URL"
echo ""

echo -e "${GREEN}✅ Deployment configuration is ready!${NC}"
echo -e "${BLUE}📖 See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions${NC}"

# Offer to start deployment
read -p "Do you want to start backend deployment now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}🚀 Starting backend deployment...${NC}"
    cd backend
    vercel --prod
fi