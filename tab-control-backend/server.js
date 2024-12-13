const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");
const tabCheckRoutes = require("./routes/tabCheck");
const logoutOtherRoutes = require("./routes/logoutOther"); // Import the new route

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/tab-check", tabCheckRoutes);
app.use("/api/logout-other", logoutOtherRoutes); // Register the new route

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
