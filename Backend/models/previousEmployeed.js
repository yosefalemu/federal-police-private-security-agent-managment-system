const mongoose = require("mongoose");

const PreviousEmployeedSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "EmployeeSchema",
    },
    agentId: {
      type: mongoose.Types.ObjectId,
      ref: "AgentSchema",
    },
    agentName: {
      type: String,
      required: [true, "please provide agent name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PreviousEmployeedSchema",
  PreviousEmployeedSchema
);
