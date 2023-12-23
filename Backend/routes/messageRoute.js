const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createMessage,
  getMessages,

} = require("../controllers/messageController");

router.post("/createMessage", authenticateUser, createMessage);
router.get("/:conversationId", authenticateUser, getMessages);


module.exports = router;
