const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();


router.post("/login", async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, email, name });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
