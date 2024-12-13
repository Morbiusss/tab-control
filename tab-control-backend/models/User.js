const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    activeTab: { type: String, default: null }, // stores active application ID
});

module.exports = mongoose.model("User", UserSchema);
