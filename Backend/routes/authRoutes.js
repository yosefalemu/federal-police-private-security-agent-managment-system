const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/usersController");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
