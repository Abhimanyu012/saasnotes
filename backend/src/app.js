const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const tenantsRoutes = require('./routes/tenants');
const healthRoutes = require('./routes/health');
require('dotenv').config();

const app = express();
app.use(cors());
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
