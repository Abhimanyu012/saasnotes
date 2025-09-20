#!/bin/bash

# Set environment variables for backend production deployment

echo "Setting up production environment variables for backend..."

# JWT Secret
echo "85b3bec6054d6ffcfc8528e11f2b7a2ceb06bee0e0c53e66590d357767a762b61bf9f3b653b645c06fc3cefcb07ee8863d038f57449af10d84764e00e5a5df5b" | vercel env add JWT_SECRET production --force

# CORS Origins
echo "https://frontend-2043kj6ad-abhimanyukumars-projects.vercel.app,https://frontend-five-azure-57.vercel.app" | vercel env add ALLOWED_ORIGINS production --force

echo "Environment variables set successfully!"