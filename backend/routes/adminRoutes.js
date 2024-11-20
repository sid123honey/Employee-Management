const express = require("express");
const Resignation = require('../models/resignModel')
const QuestionnaireResponse = require("../models/exitResponseModel");
const { checkRole, authenticate } = require("../middlewares/authMiddleware");
const router  = express.Router();
// Admin views all resignations
router.get("/resignations", authenticate, checkRole("admin"), async (req, res) => {
  const resignations = await Resignation.find().populate("employeeId"); // Populate employee details
  res.status(200).json({ data: resignations });
});

// Admin approves or rejects resignation
router.put("/conclude_resignation",authenticate, checkRole("admin"), async (req, res) => {
  const { resignationId, approved, lwd } = req.body;

  const resignation = await Resignation.findById(resignationId);
  if (!resignation) {
    return res.status(404).json({ message: "Resignation not found" });
  }

  resignation.status = approved ? "approved" : "rejected";
  resignation.lwd = lwd;
  await resignation.save();

  res.status(200).json({ message: "Resignation status updated successfully" });
});
router.get("/exit_responses", authenticate, checkRole("admin"), async (req, res) => {
  try {
    // Fetch all responses and populate employee details
    const responses = await QuestionnaireResponse.find().populate("employeeId", "username"); // Populate only the employee username
    res.status(200).json({
      data: responses,
    });
  } catch (error) {
    console.error("Error fetching exit questionnaire responses:", error);
    res.status(500).json({ message: "Failed to fetch exit questionnaire responses" });
  }
});
module.exports = router;