const mongoose = require("mongoose");

const questionnaireResponseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    responses: [
      {
        questionText: {
          type: String,
          required: true,
        },
        response: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionnaireResponse", questionnaireResponseSchema);
