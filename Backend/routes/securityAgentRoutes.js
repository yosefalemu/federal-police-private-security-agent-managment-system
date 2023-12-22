const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllAgents,
  getSingleAgent,
  getAgentWithEmail,
  updateAgent,
} = require("../controllers/securityAgentsController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllAgents);

router
  .route("/getagentwithemail/:email")
  .get(authenticateUser, authorizePermissions("agent"), getAgentWithEmail);

router
  .route("/updateAgent/:id")
  .patch(authenticateUser, authorizePermissions("agent", "admin"), updateAgent);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSingleAgent);

module.exports = router;
