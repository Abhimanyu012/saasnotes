#!/bin/bash

# Quick Vercel Deployment Script
# This script helps deploy both frontend and backend to Vercel

echo "🚀 SaaS Notes - Vercel Deployment Script"
echo "========================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "📋 Deployment Options:"
echo "1. Deploy Backend Only"
echo "2. Deploy Frontend Only"
echo "3. Deploy Both (Recommended)"
echo "4. View Deployment Status"
echo ""

read -p "Select an option (1-4): " option

case $option in
    1)
        echo "🔧 Deploying Backend..."
        cd backend
        vercel --prod
        ;;
    2)
        echo "🎨 Deploying Frontend..."
        cd frontend
        vercel --prod
        ;;
    3)
        echo "🚀 Deploying Both Applications..."
        echo ""
        echo "📦 Deploying Backend first..."
        cd backend
        vercel --prod
        echo ""
        echo "🎨 Deploying Frontend..."
        cd ../frontend
        vercel --prod
        echo ""
        echo "✅ Both applications deployed!"
        ;;
    4)
        echo "📊 Checking deployment status..."
        vercel ls
        ;;
    *)
        echo "❌ Invalid option. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "💡 Tips:"
echo "- Check your Vercel dashboard for deployment URLs"
echo "- Update CORS settings with your frontend URL"
echo "- Add environment variables in Vercel dashboard"
echo "- Test your application thoroughly"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"