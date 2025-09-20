const bcrypt = require('bcryptjs');
const { signJwt } = require('../utils/jwt');
const User = require('../models/User');
const Tenant = require('../models/Tenant');

// Predefined users for testing
const predefinedUsers = [
  { email: 'admin@acme.test', role: 'admin', tenant: 'Acme' },
  { email: 'user@acme.test', role: 'member', tenant: 'Acme' },
  { email: 'admin@globex.test', role: 'admin', tenant: 'Globex' },
  { email: 'user@globex.test', role: 'member', tenant: 'Globex' },
];

/**
 * Seed tenants and users if not present
 */
const seedData = async (req, res) => {
  try {
    for (const tName of ['Acme', 'Globex']) {
      let tenant = await Tenant.findOne({ name: tName });
      if (!tenant) {
        tenant = await Tenant.create({ name: tName, slug: tName.toLowerCase(), plan: 'free' });
      }
      for (const user of predefinedUsers.filter(u => u.tenant === tName)) {
        let u = await User.findOne({ email: user.email });
        if (!u) {
          await User.create({
            email: user.email,
            password: await bcrypt.hash('password', 10),
            role: user.role,
            tenantId: tenant._id,
          });
        }
      }
    }
    res.json({ status: 'seeded', message: 'Test accounts created successfully' });
  } catch (err) {
    console.error('Seed Error:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};

/**
 * User login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = signJwt({ id: user._id });
    const tenant = await Tenant.findById(user.tenantId);
    
    res.json({ 
      token, 
      tenantSlug: tenant?.slug || '', 
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};

module.exports = {
  seedData,
  login
};