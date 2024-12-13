// routes/tabCheck.js
const express = require("express");
const router = express.Router();

let activeSessions = {}; // To store active sessions (in-memory for simplicity)

router.post("/", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (activeSessions[userId]) {
    return res.status(200).json({ message: "Already logged in another tab", active: true });
  }

  activeSessions[userId] = true; // Mark user as active
  return res.status(200).json({ message: "Tab logged in", active: false });
});

router.post("/logout", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  delete activeSessions[userId];
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
