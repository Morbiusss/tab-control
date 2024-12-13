const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('../config/socialmedia-ec7a0-firebase-adminsdk-6wera-7cef5846df.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for the Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is missing or malformed!' });
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify the token
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Token:", decodedToken);  // For debugging
        req.user = decodedToken;  // Attach user info to the request
        next();  // Proceed to the next middleware
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ message: 'Invalid token!' });
    }
};
