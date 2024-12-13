const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    app_name: { type: String, required: true },
});

module.exports = mongoose.model("Application", ApplicationSchema);
