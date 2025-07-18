const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to req object, excluding password
      const user = await User.findById(decoded.id).select("-password");

      // Edge case: User not found in DB
      if (!user) {
        return res.status(404).json({ message: "User associated with token not found" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }
  } catch (error) {
    // Handle invalid/expired token
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = { protect };
