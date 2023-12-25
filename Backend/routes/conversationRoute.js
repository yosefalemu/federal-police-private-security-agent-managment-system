const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createConversation,
  getUserConversation,
  getConversationTwoUsers
} = require("../controllers/conversationController");

router.post("/createConversation", authenticateUser, createConversation);
router.get("/:id", authenticateUser, getUserConversation);
router.get("/:firstId/:secondId", authenticateUser, getConversationTwoUsers)

module.exports = router;
