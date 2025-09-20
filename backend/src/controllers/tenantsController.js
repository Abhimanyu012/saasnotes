const Tenant = require('../models/Tenant');

/**
 * Upgrade tenant to Pro plan (Admin only)
 */
const upgradeTenant = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const tenant = await Tenant.findOneAndUpdate(
      { slug },
      { plan: 'pro' },
      { new: true }
    );
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    res.json({ 
      success: true, 
      plan: tenant.plan,
      message: 'Tenant upgraded to Pro successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get tenant information
 */
const getTenantInfo = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.tenantId);
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    res.json({
      id: tenant._id,
      name: tenant.name,
      slug: tenant.slug,
      plan: tenant.plan
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  upgradeTenant,
  getTenantInfo
};