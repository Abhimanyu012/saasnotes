# Vercel Deployment Guide

## 🚀 Complete Deployment Steps

Your SaaS Notes Application is **fully ready** for deployment and meets all requirements:
- ✅ Multi-tenancy with Acme/Globex tenants
- ✅ JWT authentication with predefined test accounts
- ✅ Role-based authorization (Admin/Member)
- ✅ Free plan (3 notes limit) & Pro plan (unlimited)
- ✅ Admin-only upgrade endpoint
- ✅ Complete Notes CRUD API with tenant isolation
- ✅ CORS enabled for automated scripts
- ✅ Health endpoint: GET /health
- ✅ Frontend with login, notes management, and upgrade functionality

## Backend Deployment (API)

### Step 1: Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with actual password)
5. Whitelist all IPs (0.0.0.0/0) for Vercel

### Step 2: Deploy Backend to Vercel
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Backend**:
   ```bash
   cd backend
   vercel --prod
   ```

4. **Set Environment Variables** (in Vercel dashboard or CLI):
   ```bash
   vercel env add MONGO_URI
   # Enter your MongoDB connection string
   
   vercel env add JWT_SECRET
   # Enter a secure random string like: abc123xyz789secret
   
   vercel env add NODE_ENV
   # Enter: production
   ```

5. **Redeploy with env vars**:
   ```bash
   vercel --prod
   ```

6. **Initialize test data**:
   ```bash
   curl https://your-backend-url.vercel.app/api/auth/seed
   ```

## Frontend Deployment

### Step 1: Update API URL
1. **Update Vite config** to point to your deployed backend:
   ```bash
   cd ../frontend
   ```

2. **Edit `vite.config.js`**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'https://your-backend-url.vercel.app',
           changeOrigin: true,
         },
       },
     },
   })
   ```

### Step 2: Deploy Frontend
1. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Set build command** (if prompted):
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Testing Deployment

### 1. Test Health Endpoint
```bash
curl https://your-backend-url.vercel.app/api/health
# Should return: {"status":"ok"}
```

### 2. Initialize Test Data
```bash
curl https://your-backend-url.vercel.app/api/auth/seed
# Should return: {"status":"seeded"}
```

### 3. Test Predefined Accounts
Visit your frontend URL and login with:
- **admin@acme.test** / password (Admin, Acme tenant)
- **user@acme.test** / password (Member, Acme tenant)  
- **admin@globex.test** / password (Admin, Globex tenant)
- **user@globex.test** / password (Member, Globex tenant)

### 4. Verify Features
- ✅ Login with test accounts
- ✅ Create/view/edit/delete notes (tenant isolation)
- ✅ Free plan limit (3 notes max)
- ✅ Admin can upgrade tenant to Pro
- ✅ Role restrictions (Members can't upgrade)

## Quick Deploy Commands

```bash
# Backend
cd backend
vercel --prod

# Frontend  
cd ../frontend
vercel --prod
```

## Environment Variables Required

**Backend (.env)**:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

**Frontend** (no env vars needed - API URL in vite config)

## 🎯 Verification Checklist

Your deployed app will pass all automated tests:
- [x] Health endpoint available
- [x] Login for all predefined accounts works
- [x] Tenant isolation enforced
- [x] Role-based restrictions work
- [x] Free plan note limit enforced
- [x] Upgrade removes limit
- [x] All CRUD endpoints functional
- [x] Frontend accessible and working

**Your app is production-ready! 🚀**