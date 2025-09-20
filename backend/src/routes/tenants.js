const express = require('express');
const { upgradeTenant, getTenantInfo } = require('../controllers/tenantsController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const tenantMw = require('../middleware/tenant');
const router = express.Router();

router.use(auth);
router.use(tenantMw);

// Get tenant info
router.get('/info', getTenantInfo);

// Upgrade endpoint (Admin only)
router.post('/:slug/upgrade', role(['admin']), upgradeTenant);

module.exports = router;
