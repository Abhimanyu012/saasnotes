const express = require('express');
const { seedData, login } = require('../controllers/authController');
const router = express.Router();

// Seed tenants and users if not present
router.get('/seed', seedData);

// Login
router.post('/login', login);

module.exports = router;
