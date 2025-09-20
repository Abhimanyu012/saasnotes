#!/bin/bash

# Deployment Validation Script
# Checks if all files are properly configured for Vercel deployment

echo "🔍 Validating Vercel Deployment Configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ERRORS=0

# Check backend files
echo -e "${BLUE}📁 Checking Backend Configuration...${NC}"

if [ -f "backend/vercel.json" ]; then
    echo -e "${GREEN}✅ backend/vercel.json exists${NC}"
else
    echo -e "${RED}❌ backend/vercel.json missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✅ backend/package.json exists${NC}"
else
    echo -e "${RED}❌ backend/package.json missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "backend/server.js" ]; then
    echo -e "${GREEN}✅ backend/server.js exists${NC}"
else
    echo -e "${RED}❌ backend/server.js missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check frontend files
echo -e "${BLUE}📁 Checking Frontend Configuration...${NC}"

if [ -f "frontend/vercel.json" ]; then
    echo -e "${GREEN}✅ frontend/vercel.json exists${NC}"
else
    echo -e "${RED}❌ frontend/vercel.json missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✅ frontend/package.json exists${NC}"
else
    echo -e "${RED}❌ frontend/package.json missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "frontend/vite.config.js" ]; then
    echo -e "${GREEN}✅ frontend/vite.config.js exists${NC}"
else
    echo -e "${RED}❌ frontend/vite.config.js missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test builds
echo -e "${BLUE}🔨 Testing Builds...${NC}"

echo "Testing frontend build..."
cd frontend
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    ERRORS=$((ERRORS + 1))
fi

cd ..

# Summary
echo -e "${BLUE}📊 Validation Summary${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for deployment.${NC}"
    echo -e "${BLUE}Run ./deploy-vercel.sh to start deployment${NC}"
else
    echo -e "${RED}❌ Found $ERRORS error(s). Please fix before deploying.${NC}"
fi