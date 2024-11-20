const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10); // Hash the password for security
      const adminUser = new User({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.error("Error seeding admin user:", err);
  }
};

module.exports = seedAdmin;
