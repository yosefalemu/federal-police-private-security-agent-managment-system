const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createConversation,
  getConversation,
  updateConversation,
} = require("../controllers/conversationController");

router.post("/createConversation", authenticateUser, createConversation);
router.get("/:id", authenticateUser, getConversation);
router.patch("/:conversationId", authenticateUser, updateConversation);

module.exports = router;
