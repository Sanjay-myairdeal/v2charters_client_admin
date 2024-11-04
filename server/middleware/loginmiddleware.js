const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const admin = require("../models/admin.js");

exports.verifyToken = async (req, res, next) => {
  // Ensure the token is in the Authorization header, case-insensitive
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Token not provided" });
  }

  // Split the 'Bearer' prefix from the actual token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  // Verify the token using the JWT secret
  try {
    if (!jwt_secret)
      throw new Error("JWT_SECRET is not defined in environment variables.");

    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.userId;

     // Check if user is blocked
     const user = await admin.findById(req.userId).select("isBlocked");
     if (!user) return res.status(404).json({ message: "User not found" });
 
     if (user.isBlocked) {
       return res.status(403).json({ message: "User is blocked. Access denied." });
     }
    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }
};
