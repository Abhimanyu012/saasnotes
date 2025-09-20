# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend to Vercel from scratch.

## Prerequisites

1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Ensure you have a Vercel account at https://vercel.com

## Backend Deployment

### Step 1: Deploy Backend
```bash
cd backend
vercel --prod
```

### Step 2: Set Environment Variables
After deployment, add these environment variables in Vercel dashboard:

**Required Environment Variables:**
- `NODE_ENV=production`
- `MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0`
- `JWT_SECRET=85b3bec6054d6ffcfc8528e11f2b7a2ceb06bee0e0c53e66590d357767a762b61bf9f3b653b645c06fc3cefcb07ee8863d038f57449af10d84764e00e5a5df5b`
- `ALLOWED_ORIGINS=https://your-frontend-url.vercel.app`

### Step 3: Get Backend URL
Note the deployed backend URL (e.g., `https://your-backend-url.vercel.app`)

## Frontend Deployment

### Step 1: Update Frontend Configuration
Update the backend URL in the frontend environment:
- Set `VITE_API_URL` in Vercel dashboard to your backend URL

### Step 2: Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Step 3: Update CORS
After frontend deployment, update the backend's `ALLOWED_ORIGINS` environment variable with the frontend URL.

## Quick Deployment Commands

### Backend
```bash
cd backend
vercel --prod
```

### Frontend
```bash
cd frontend
vercel --prod
```

## Environment Variables Setup

### Backend Environment Variables in Vercel:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=85b3bec6054d6ffcfc8528e11f2b7a2ceb06bee0e0c53e66590d357767a762b61bf9f3b653b645c06fc3cefcb07ee8863d038f57449af10d84764e00e5a5df5b
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables in Vercel:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## Testing Deployment

1. Test backend health endpoint: `https://your-backend-url.vercel.app/api/health`
2. Test frontend: `https://your-frontend-url.vercel.app`
3. Test full authentication flow

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure frontend URL is added to `ALLOWED_ORIGINS`
2. **Database Connection**: Verify `MONGO_URI` is correct
3. **Authentication Issues**: Check `JWT_SECRET` is set properly
4. **API Not Found**: Verify `VITE_API_URL` points to correct backend URL

### Logs
- Check Vercel function logs in the Vercel dashboard
- Use `vercel logs [deployment-url]` for detailed logs

## Files Modified for Deployment

### Backend:
- `vercel.json` - Serverless configuration
- `package.json` - Added Node.js engine specification
- `src/app.js` - Enhanced CORS configuration
- `.env.production` - Production environment template

### Frontend:
- `vercel.json` - Vite build configuration with SPA routing
- `vite.config.js` - Production build optimizations
- `src/config/api.js` - Environment-based API configuration
- `.env.production` - Frontend environment template

## Security Notes

- The JWT secret has been regenerated for production security
- Database credentials should be rotated periodically
- Consider implementing rate limiting for production
- Monitor API usage and set up alerts