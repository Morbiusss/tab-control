const express = require("express");
const router = express.Router();

let activeSessions = {}; 

router.post("/", (req, res) => {
  const { userId, appId } = req.body; 

  if (!userId || !appId) {
    return res.status(400).json({ message: "User ID and App ID are required" });
  }


  if (activeSessions[appId] && activeSessions[appId][userId]) {
    return res.status(200).json({ message: "Already logged in another tab", active: true });
  }


  if (!activeSessions[appId]) {
    activeSessions[appId] = {};
  }

  activeSessions[appId][userId] = true; 
  return res.status(200).json({ message: "Tab logged in", active: false });
});

router.post("/logout-other", (req, res) => {
  const { userId, appId } = req.body;

  if (!userId || !appId) {
    return res.status(400).json({ message: "User ID and App ID are required" });
  }


  if (activeSessions[appId] && activeSessions[appId][userId]) {
    delete activeSessions[appId][userId];
  }

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
