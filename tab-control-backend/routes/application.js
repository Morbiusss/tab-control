const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Application = require("../models/Application");

const router = express.Router();

// Fetch applications
router.get("/", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
