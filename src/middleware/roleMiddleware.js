// middleware/roleMiddleware.js

const PERMISSIONS = require("../config/permissions");

const roleAuth = (resource, action) => {
  return (req, res, next) => {
    const role = req.user.role;

    const allowedRoles = PERMISSIONS[resource]?.[action];

    if (!allowedRoles) {
      return res.status(500).json({
        message: "Permission not defined",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = { roleAuth };