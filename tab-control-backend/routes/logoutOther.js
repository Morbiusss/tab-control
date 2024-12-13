
// routes/logoutOther.js
const express = require("express");
const router = express.Router();

// Example handler for logging out from another tab
router.post("/", async (req, res) => {
    try {
        const { appId, userId } = req.body;
        // Perform your logout logic here
        // For example, invalidate the session or token in the database

        console.log(`Logging out user ${userId} from app ${appId}`);

        // Respond with success message
        res.status(200).json({ message: "Logged out from the other tab." });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Error logging out from the other tab." });
    }
});

module.exports = router;
