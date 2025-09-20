# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of the SaaS Notes application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **GitHub Repository**: Ensure your code is pushed to GitHub
4. **MongoDB Atlas**: Have your MongoDB connection string ready

## Backend Deployment

### 1. Deploy Backend via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository (`saasnotes`)
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (not needed for Node.js)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### 2. Configure Environment Variables

In the Vercel dashboard, go to Settings → Environment Variables and add:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://abhimanyu:Abhi%401234@cluster0.rwyvl.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-production-ready
```

### 3. Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Note the backend URL (e.g., `https://your-backend.vercel.app`)

### Alternative: Deploy via CLI

```bash
cd backend
vercel
# Follow the prompts
vercel --prod
```

## Frontend Deployment

### 1. Update API Base URL

Before deploying, update the frontend to use your deployed backend URL:

1. Open `frontend/src/config/api.js` (create if doesn't exist)
2. Add your backend URL:

```javascript
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.vercel.app'
  : 'http://localhost:5000';
```

3. Update your API calls to use this base URL

### 2. Deploy Frontend via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository (`saasnotes`) again
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables (if needed)

Add any frontend environment variables:

```
VITE_API_URL=https://your-backend.vercel.app
```

### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at the provided URL

### Alternative: Deploy via CLI

```bash
cd frontend
vercel
# Follow the prompts
vercel --prod
```

## Post-Deployment Steps

### 1. Update CORS Settings

Update your backend's CORS configuration to include your frontend domain:

```javascript
// In backend/src/app.js
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-frontend.vercel.app'  // Add your frontend URL
  ],
  credentials: true
};
```

### 2. Test the Deployment

1. Visit your frontend URL
2. Try logging in with test credentials:
   - Email: `admin@acme.test`
   - Password: `password123`
3. Test creating and managing notes

### 3. Custom Domains (Optional)

You can add custom domains in Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://abhimanyu:Abhi%401234@cluster0.rwyvl.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-production-ready
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.vercel.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure frontend domain is added to CORS whitelist
2. **API Connection Issues**: Check if backend URL is correct in frontend
3. **Database Connection**: Verify MongoDB URI and network access
4. **Build Errors**: Check package.json scripts and dependencies

### Logs

- View deployment logs in Vercel dashboard
- Use `vercel logs` CLI command for recent logs
- Monitor function logs for runtime errors

## Automatic Deployments

Vercel automatically deploys when you push to your connected Git branch:
- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches

## Security Notes

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret in production
3. **Database**: Ensure MongoDB has proper IP whitelisting
4. **CORS**: Only allow necessary origins

## Next Steps

1. **Monitoring**: Set up error tracking (Sentry, etc.)
2. **Analytics**: Add usage analytics
3. **CDN**: Vercel provides global CDN automatically
4. **Custom Domain**: Configure your own domain
5. **SSL**: Automatically provided by Vercel

Your SaaS Notes application is now deployed and ready for production use!