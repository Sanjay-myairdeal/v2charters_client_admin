const UserRole = require('../models/UserRole');
const Admin=require('../models/admin')
// Get all user roles
exports.getUserRoles = async (req, res) => {
    try {
        const allUserRoles = await UserRole.find({});
        if (!allUserRoles || allUserRoles.length === 0) {
            return res.status(404).json({ message: "No User Roles created currently" });
        }
        return res.status(200).json({ message: "User Roles fetched successfully", allUserRoles });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Add a new user role
exports.addUserRole = async (req, res) => {
    try {
        const { role, canAdd, canEdit, canDelete } = req.body;

        // Check if the role already exists
        const existed = await UserRole.findOne({ role });
        if (existed) {
            return res.status(403).json({ message: "Role already exists" });
        }

        // Check if the role is provided, permissions should allow `false` values
        if (!role || canAdd === undefined || canEdit === undefined || canDelete === undefined) {
            return res.status(400).json({ message: "Role or permissions are missing" });
        }

        // Create the new user role with the provided permissions
        const newUserRole = new UserRole({
            role,
            permissions: {
                canAdd,
                canEdit,
                canDelete
            }
        });

        await newUserRole.save();
        return res.status(201).json({ message: "User role added successfully", newUserRole });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};



// Update permissions for a specific role
exports.editUserRolePermissionsById = async (req, res) => {
    try {
        const { id } = req.params; // Role ID
        const { canAdd, canEdit,  canDelete } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Role ID is missing" });
        }

        const updatedRole = await UserRole.findByIdAndUpdate(
            id,
            {
                permissions: { canAdd, canEdit, canDelete }
            },
            { new: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: "User role not found" });
        }

        return res.status(200).json({ message: "Role permissions updated successfully", updatedRole });
    } catch (error) {
        console.error("Error updating role permissions:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// delete User  Role by Id
    exports.deleteUserRoleByID = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "ID is missing" });
            }

            // Find and delete the role
            const deletedData = await UserRole.findByIdAndDelete(id);
            
            if (!deletedData) {
                return res.status(404).json({ message: "User Role not found" });
            }

        
              // Delete all users associated with the deleted role
        const deletedUsersResult = await Admin.deleteMany({ role: deletedData._id });
            return res.status(200).json({ 
                message: "User Role and associated users deleted successfully", 
                deletedRole: deletedData, 
                deletedUsers: deletedUsersResult 
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error" });
        }
    };
