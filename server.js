const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
