// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("🔑 authenticate ~ authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // console.log("🔑 authenticate ~ missing or invalid Authorization header");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("🔑 authenticate ~ bearer token length:", token ? token.length : 0);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("🔑 authenticate ~ decoded token:", decoded);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    console.log("🔑 authenticate error name:", error.name);
    console.log("🔑 authenticate error message:", error.message);
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = { authenticate };