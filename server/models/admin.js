const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the UserRole object
    ref: "UserRole", // Reference to the UserRole model
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("admin", AdminSchema);
