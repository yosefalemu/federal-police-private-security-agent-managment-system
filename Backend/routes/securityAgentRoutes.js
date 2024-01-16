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
  getSingleAgentByName,
  getAgentByUserIdAndUpdate,
} = require("../controllers/securityAgentsController");

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin", "screener"),
    getAllAgents
  );

router
  .route("/getagentwithemail/:email")
  .get(
    authenticateUser,
    authorizePermissions("agent", "admin", "screener"),
    getAgentWithEmail
  );

router
  .route("/updateAgent/:id")
  .patch(authenticateUser, authorizePermissions("agent", "admin"), updateAgent);

router
  .route("/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin", "agent"),
    getSingleAgent
  );
router
  .route("/getAgentName")
  .post(authenticateUser, authorizePermissions("admin"), getSingleAgentByName);
router
  .route("/updateAgentFromUser/:userId")
  .patch(
    authenticateUser,
    authorizePermissions("agent"),
    getAgentByUserIdAndUpdate
  );

module.exports = router;
