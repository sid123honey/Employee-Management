// Employee submits resignation
const express = require("express");
const Resignation = require('../models/resignModel')
const router  = express.Router();
const { checkRole, authenticate } = require("../middlewares/authMiddleware");
const QuestionnaireResponse = require("../models/exitResponseModel");

router.post("/resign",authenticate, async (req, res) => {
  console.log("heellooo");
  const { lwd } = req.body; // Last Working Day
  const employeeId = req.user.id;

  if (req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied. Only employees can submit resignation." });
  }


  const resignation = new Resignation({
    employeeId,
    lwd,
    status: "pending",
  });
  
  await resignation.save();
  res.status(200).json({ message: "Resignation submitted successfully", data: { resignation } });
});
router.post("/responses", authenticate, checkRole("employee"), async (req, res) => {
  try {
    const { responses } = req.body;

    // Validate request body
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ message: "Invalid responses format or empty array" });
    }

    // Create a new questionnaire response
    const questionnaireResponse = new QuestionnaireResponse({
      employeeId: req.user.id, // Use the authenticated user's ID
      responses,
    });

    // Save to the database
    await questionnaireResponse.save();

    res.status(200).json({ message: "Responses submitted successfully" });
  } catch (error) {
    console.error("Error submitting questionnaire responses:", error);
    res.status(500).json({ message: "Failed to submit responses" });
  }
});
module.exports = router;