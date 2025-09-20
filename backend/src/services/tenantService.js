const Tenant = require('../models/Tenant');
const Note = require('../models/Note');

/**
 * Check if tenant can create more notes based on plan
 */
const canCreateNote = async (tenantId) => {
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new Error('Tenant not found');
  }

  if (tenant.plan === 'pro') {
    return { allowed: true, limit: null };
  }

  const noteCount = await Note.countDocuments({ tenantId });
  const limit = 3; // Free plan limit

  return {
    allowed: noteCount < limit,
    limit,
    current: noteCount,
    remaining: Math.max(0, limit - noteCount)
  };
};

/**
 * Get tenant usage statistics
 */
const getTenantStats = async (tenantId) => {
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new Error('Tenant not found');
  }

  const noteCount = await Note.countDocuments({ tenantId });

  return {
    tenant: {
      name: tenant.name,
      slug: tenant.slug,
      plan: tenant.plan
    },
    usage: {
      notes: noteCount,
      limit: tenant.plan === 'free' ? 3 : null
    }
  };
};

module.exports = {
  canCreateNote,
  getTenantStats
};