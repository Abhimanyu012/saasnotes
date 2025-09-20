# 🛠️ Development Guide

## 🚀 Quick Start

### **Setup Project**
```bash
# Automated setup
./scripts/setup.sh

# Manual setup
cd backend && npm install
cd ../frontend && npm install
```

### **Start Development**
```bash
# Backend (Terminal 1)
cd backend
npm run dev  # Uses nodemon for auto-restart

# Frontend (Terminal 2)  
cd frontend
npm run dev  # Vite development server
```

### **Access Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🧪 **Testing**

### **Initialize Test Data**
```bash
curl http://localhost:5000/api/auth/seed
```

### **Test Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@acme.test", "password": "password"}'
```

### **Test Accounts**
- `admin@acme.test` / `password` (Admin, Acme)
- `user@acme.test` / `password` (Member, Acme)
- `admin@globex.test` / `password` (Admin, Globex)
- `user@globex.test` / `password` (Member, Globex)

## 📝 **Development Workflow**

### **Adding New Features**
1. **Backend**: Add controller → Add route → Update frontend API client
2. **Frontend**: Add component → Add to pages → Update routing

### **File Locations**
- **API Logic**: `backend/src/controllers/`
- **Routes**: `backend/src/routes/`
- **Business Logic**: `backend/src/services/`
- **React Components**: `frontend/src/components/`
- **React Pages**: `frontend/src/pages/`

### **Environment Variables**
```bash
# Backend .env (already configured)
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://abhimanyukumarssm0012_db_user:ug99ophTlO2wzRXJ@cluster0.bdb0an5.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=abc123xyz789secret-change-this-in-production
```

## 🚀 **Ready for Production**

Your app is fully structured and ready for deployment to Vercel!