# Git-Based Auto Deployment to Vercel

## 🚀 Setup Automatic Deployment

### Step 1: Connect Repository to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Setup production-ready environment and folder structure"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Choose your GitHub repository: `Abhimanyu012/saasnotes`

### Step 2: Configure Backend Deployment

1. **Backend Setup**:
   - Root Directory: `backend`
   - Framework Preset: `Other`
   - Build Command: `npm install`
   - Output Directory: `.` (leave empty)
   - Install Command: `npm install`

2. **Environment Variables** (Critical):
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-production-jwt-key-change-this
   ```

### Step 3: Configure Frontend Deployment

1. **Frontend Setup**:
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Update API URL** in `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'https://your-backend-project.vercel.app',
           changeOrigin: true,
         },
       },
     },
   })
   ```

## 🔄 Automatic Deployment Flow

### How It Works:
1. **Code Change**: You modify files locally
2. **Git Push**: Push to GitHub repository
3. **Auto Deploy**: Vercel automatically detects changes
4. **Build & Deploy**: Both frontend and backend redeploy
5. **Live Update**: Changes go live immediately

### Triggers:
- ✅ Push to `main` branch → Production deployment
- ✅ Push to other branches → Preview deployment
- ✅ Pull requests → Preview deployment

## 📝 Deployment Commands

### Initial Setup:
```bash
# 1. Commit current changes
git add .
git commit -m "Production setup with environment configuration"
git push origin main

# 2. Deploy backend
vercel --prod
# Set environment variables in Vercel dashboard

# 3. Deploy frontend  
cd frontend
# Update vite.config.js with backend URL
vercel --prod
```

### Future Updates:
```bash
# Just push to GitHub - Vercel handles the rest!
git add .
git commit -m "Your changes"
git push origin main
```

## 🔧 Environment Variable Management

### Backend Variables (set in Vercel dashboard):
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=production-secret-key-change-this
```

### Local Development:
```bash
# Backend .env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=dev-secret-key
```

## 🎯 Verification Steps

### After Each Deployment:
1. **Health Check**: `https://your-backend.vercel.app/api/health`
2. **Seed Data**: `https://your-backend.vercel.app/api/auth/seed`
3. **Frontend Test**: Login with `admin@acme.test` / `password`
4. **Feature Test**: Create notes, test limits, try upgrade

### Monitoring:
- Vercel dashboard shows deployment status
- Function logs available in Vercel
- Automatic rollback on build failures

## 🚨 Important Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use Vercel dashboard** for production environment variables
3. **Test in preview** before merging to main
4. **Monitor function usage** to avoid Vercel limits

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Function Logs**: https://vercel.com/[user]/[project]/functions
- **Deployment History**: https://vercel.com/[user]/[project]/deployments
- **Environment Variables**: https://vercel.com/[user]/[project]/settings/environment-variables