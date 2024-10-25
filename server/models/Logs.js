const mongoose = require("mongoose");
const adminlogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  action: {
    type: String,
    enum: ["add", "edit", "delete"],
    required: true,
  },
  targetType: {
    type: String,
    required: true
  }, // E.g., "Type", "Subcategory"
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }, // ID of the affected document
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('AdminLog', adminlogSchema);