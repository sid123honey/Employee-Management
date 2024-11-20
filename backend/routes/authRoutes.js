const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assume a User model with 'username', 'password', 'role'
// const { checkRole, authenticate } = require("./middlewares");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  // Default role is "employee", except for the "admin" user
  const role = username.toLowerCase() === "admin" ? "admin" : "employee";
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "your-jwt-secret", { expiresIn: "1h" });
  res.status(200).json({ token });
});
module.exports = router;