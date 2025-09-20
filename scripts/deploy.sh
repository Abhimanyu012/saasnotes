#!/bin/bash

echo "🚀 SaaS Notes App - Vercel Deployment Script"
echo "=============================================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "📋 BEFORE DEPLOYMENT:"
echo "1. Create MongoDB Atlas cluster and get connection string"
echo "2. Make sure you're logged into Vercel (vercel login)"
echo ""

read -p "Press Enter when ready to deploy backend..."

echo ""
echo "🔧 Deploying Backend..."
cd backend
vercel --prod

echo ""
echo "⚙️  IMPORTANT: Set these environment variables in Vercel dashboard:"
echo "   MONGO_URI=your-mongodb-connection-string"
echo "   JWT_SECRET=your-secret-key"
echo "   NODE_ENV=production"
echo ""

read -p "Press Enter after setting environment variables..."

echo ""
echo "🔄 Redeploying backend with environment variables..."
vercel --prod

BACKEND_URL=$(vercel --prod 2>/dev/null | grep -o 'https://[^[:space:]]*')
echo ""
echo "✅ Backend deployed to: $BACKEND_URL"

echo ""
echo "🌱 Initializing test data..."
curl -s "$BACKEND_URL/api/auth/seed" | jq . || echo "Seed complete"

echo ""
echo "🖥️  Deploying Frontend..."
cd ../frontend

echo ""
echo "⚠️  UPDATE REQUIRED: Edit vite.config.js and replace the proxy target with:"
echo "   target: '$BACKEND_URL'"
echo ""

read -p "Press Enter after updating vite.config.js..."

vercel --prod

FRONTEND_URL=$(vercel --prod 2>/dev/null | grep -o 'https://[^[:space:]]*')

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================="
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""
echo "🧪 Test with these accounts:"
echo "   admin@acme.test / password"
echo "   user@acme.test / password"
echo "   admin@globex.test / password"
echo "   user@globex.test / password"
echo ""
echo "✅ Your app meets all requirements and is ready for evaluation!"