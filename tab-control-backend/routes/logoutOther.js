

const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { appId, userId } = req.body;
       
        

        console.log(`Logging out user ${userId} from app ${appId}`);

       
        res.status(200).json({ message: "Logged out from the other tab." });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Error logging out from the other tab." });
    }
});

module.exports = router;
