const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Conversations", ConversationSchema);
