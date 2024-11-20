const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const seedAdmin = require("./utill/seedAdmin.js");

const PORT = 8080;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    seedAdmin(); 
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
