const jwt = require("jsonwebtoken");

// Authentication Middleware
function authenticate(req, res, next) {
  console.log(req.headers);
  const authorizationHeader = req.headers.authorization;

  // Safely extract the token
  const token = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.split(" ")[1] // Extract the token part after "Bearer"
    : authorizationHeader;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, "your-jwt-secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach the decoded payload to req.user
    req.user = decoded;
    console.log(req.user, "decoded");
    next();
  });
}

// Role Checking Middleware
function checkRole(role) {
  return (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. This route is for ${role}s only.` });
    }
    next();
  };
}

module.exports = { authenticate, checkRole };
