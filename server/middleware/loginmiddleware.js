const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const token = req.headers['Authorization'];
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], jwt_secret);
        req.userId = decoded.userId; // Ensure the userId is coming from the decoded JWT
       // console.log(req.userId);  You can log to check the userId
       console.log(req.userId)
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
