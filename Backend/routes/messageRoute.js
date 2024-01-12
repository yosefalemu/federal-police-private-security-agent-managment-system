const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createMessage,
  getMessages,
  getUnViewedMessage,
  updateMessageView,
} = require("../controllers/messageController");

router.post("/createMessage", authenticateUser, createMessage);
router.get("/:conversationId", authenticateUser, getMessages);
router.post("/getunviewed/:id", authenticateUser, getUnViewedMessage);
router.patch("/updateView/:id", authenticateUser, updateMessageView);

module.exports = router;
