const admin = require('../models/admin');

exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId; // userId is set by verifyToken middleware
            const user = await admin.findById(userId).populate('role'); // Populate the role field
            
            if (!user || !user.role.permissions[permission]) {
                return res.status(403).json({ message: "Access denied. Contact admin." });
            }
            
            next(); // Allow the request to proceed if the permission check is successful
        } catch (error) {
            console.error("Error checking permissions:", error);
            return res.status(500).json({ message: "Server error" });
        }
    };
};
