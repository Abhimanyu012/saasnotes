/**
 * Health check endpoint
 */
const healthCheck = (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
};

module.exports = {
  healthCheck
};