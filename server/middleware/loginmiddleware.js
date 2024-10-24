const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    // Make sure to handle the header correctly with case-insensitivity
    const authHeader = req.headers['authorization']; // Changed to lowercase
    //console.log(authHeader); // To check if the token is being received

    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(403).json({ message: "Token not provided" });
    }

    // Extract the token by splitting the Bearer prefix from the actual token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }

    try {
        // Verify the token using the secret from environment variables
        const decoded = jwt.verify(token, jwt_secret);
        req.userId = decoded.userId; // Extract userId from the decoded token
       // console.log(req.userId);  Optional logging to confirm userId

        next(); // Pass to the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Session expired . Login again " });
    }
};
    ``