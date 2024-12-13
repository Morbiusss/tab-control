const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Application = require("./models/Application");

const seedApplications = async () => {
    const apps = [
        { app_name: "ORBIN" },
        { app_name: "ZILCH" },
        { app_name: "ZOXY" },
        { app_name: "SUPPORTAL" },
        { app_name: "GONKLE" },
        { app_name: "ZENTILITY" },
        { app_name: "OBLIQ" },
        { app_name: "APPLICA" },
        { app_name: "LUNCHPAD" },
        { app_name: "SOLGAN" },
    ];

    try {
        await connectDB();
        await Application.insertMany(apps);
        console.log("Applications seeded successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedApplications();
