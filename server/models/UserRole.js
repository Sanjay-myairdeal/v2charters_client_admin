const mongoose = require('mongoose');

// Define the schema
const UserRoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    permissions: {
        canAdd: { type: Boolean, default: false },
        canEdit: { type: Boolean, default: false },
        canDelete: { type: Boolean, default: false },
    }
});

// Export the model
module.exports = mongoose.model('UserRole', UserRoleSchema);
