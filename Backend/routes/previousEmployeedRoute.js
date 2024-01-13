const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  registerWhereEmployeeEmployeed,
  getEmployeePreviousAgents,
} = require("../controllers/previousEmployeedController");

router.post(
  "/createEmployeeAgent",
  authenticateUser,
  registerWhereEmployeeEmployeed
);
router.get(
  "/employeePreviousAgents/:userId",
  authenticateUser,
  getEmployeePreviousAgents
);

module.exports = router;
