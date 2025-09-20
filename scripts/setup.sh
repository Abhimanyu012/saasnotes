#!/bin/bash

echo "🚀 SaaS Notes App - Project Setup"
echo "=================================="

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your MongoDB connection string"
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Go back to root
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 To start development:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "📝 Don't forget to:"
echo "   1. Update backend/.env with your MongoDB URI"
echo "   2. Run the seed endpoint to create test accounts"
echo ""
echo "🧪 Test accounts:"
echo "   admin@acme.test / password"
echo "   user@acme.test / password"
echo "   admin@globex.test / password"
echo "   user@globex.test / password"