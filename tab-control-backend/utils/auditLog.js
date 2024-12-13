const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../logs/audit.log");

const logActivity = (activity) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${activity}\n`;

    fs.appendFile(logPath, logMessage, (err) => {
        if (err) console.error("Failed to log activity:", err);
    });
};

module.exports = logActivity;
