const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "ConversationSchema",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "UserSchema",
    },
    text: {
      type: String,
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
