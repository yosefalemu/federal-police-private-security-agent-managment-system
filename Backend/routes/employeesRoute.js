const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  getAgentEmployee,
  updateEmployee,
} = require("../controllers/employeesController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllEmployees);

router
  .route("/:agentId")
  .get(
    authenticateUser,
    authorizePermissions("agent", "admin"),
    getAgentEmployee
  );

router
  .route("/createEmployee")
  .post(authenticateUser, authorizePermissions("agent"), createEmployee);
router
  .route("/updateEmployee/:id")
  .patch(authenticateUser, authorizePermissions("agent"), updateEmployee);

router
  .route("/getsingle/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin", "agent"),
    getSingleEmployee
  );

module.exports = router;
