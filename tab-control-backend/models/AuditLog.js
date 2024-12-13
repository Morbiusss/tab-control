const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: String,
  activity: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
