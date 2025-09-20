module.exports = function (req, res, next) {
  // Assumes req.user is set by auth middleware
  // This line sets the tenantId from the user object
  req.tenantId = req.user.tenantId; 
  next();
};
