const mongoose = require("mongoose");

const resignationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    lwd: { // Last Working Day
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // Status of resignation
      default: "pending", // Default status is "pending"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resignation", resignationSchema);
