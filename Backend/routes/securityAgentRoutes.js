const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllAgents,
  getSingleAgent,
  updateAgent,
} = require("../controllers/securityAgentsController");

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin", "manager"),
    getAllAgents
  );

router
  .route("/updateAgent/:id")
  .patch(authenticateUser, authorizePermissions("agent", "admin"), updateAgent);

router
  .route("/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin", "manager"),
    getSingleAgent
  );

module.exports = router;
