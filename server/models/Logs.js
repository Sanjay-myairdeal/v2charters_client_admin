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
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  targetData: { 
    type: mongoose.Schema.Types.Mixed // Stores the full document data 
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminLog", adminlogSchema);
