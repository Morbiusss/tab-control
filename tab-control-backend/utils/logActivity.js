const AuditLog = require("../models/AuditLog");

const logActivity = async (userId, activity) => {
  try {
    await AuditLog.create({ userId, activity });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

module.exports = logActivity;
