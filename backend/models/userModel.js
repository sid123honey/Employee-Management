const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "admin"], // Role is either "employee" or "admin"
      default: "employee", // Default role is employee
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
