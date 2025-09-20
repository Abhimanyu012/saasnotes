const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const tenantsRoutes = require('./routes/tenants');
const healthRoutes = require('./routes/health');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://saasfrontend-pied.vercel.app',
      'https://saasfrontend-464kechul-abhimanyukumars-projects.vercel.app',
      'https://saasfrontend-gm0yp2zvz-abhimanyukumars-projects.vercel.app',
      'https://notes-frontend-abhimanyukumars-projects.vercel.app',
      'https://notes-frontend.vercel.app',
      'https://frontend-9bxgaojy0-abhimanyukumars-projects.vercel.app',
      'https://frontend-five-azure-57.vercel.app',
      // All frontend aliases and deployments
      'https://frontend-five-azure-57.vercel.app',
      'https://frontend-abhimanyukumars-projects.vercel.app',
      'https://frontend-abhimanyu012-abhimanyukumars-projects.vercel.app',
      'https://frontend-2043kj6ad-abhimanyukumars-projects.vercel.app',
      'https://frontend-ly881b2pm-abhimanyukumars-projects.vercel.app',
      'https://frontend-ofnlu61iw-abhimanyukumars-projects.vercel.app',
      'https://frontend-6gawxkh2b-abhimanyukumars-projects.vercel.app',
      'https://frontend-mkbgd1gtu-abhimanyukumars-projects.vercel.app'
    ];

    // Add environment-specific origins
    if (process.env.ALLOWED_ORIGINS) {
      const envOrigins = process.env.ALLOWED_ORIGINS.split(',');
      allowedOrigins.push(...envOrigins);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/tenants', tenantsRoutes);
app.use('/api/health', healthRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('📦 Connected to MongoDB');
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Export the Express API
module.exports = app;
