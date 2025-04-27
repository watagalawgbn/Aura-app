//middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      console.log("Invalid token:", err.message);
      return res.status(403).json({ msg: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
