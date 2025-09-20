const express = require('express');
const Tenant = require('../models/Tenant');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const tenantMw = require('../middleware/tenant');
const router = express.Router();

router.use(auth);
router.use(tenantMw);

// Upgrade endpoint (Admin only)
router.post('/:slug/upgrade', role(['admin']), async (req, res) => {
  const tenant = await Tenant.findOneAndUpdate(
    { slug: req.params.slug },
    { plan: 'pro' },
    { new: true }
  );
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
  res.json({ success: true, plan: tenant.plan });
});

module.exports = router;
