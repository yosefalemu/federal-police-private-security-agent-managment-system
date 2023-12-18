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
  updateEmployee,
} = require("../controllers/employeesController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "manager", "agent"), getAllEmployees);

router.route("/createEmployee").post(authenticateUser, authorizePermissions("agent"), createEmployee);
router
  .route("/updateEmployee/:id")
  .patch(authenticateUser, authorizePermissions("agent"), updateEmployee);

router.route("/:id").get(authenticateUser, authorizePermissions("admin", "agent", "manager"), getSingleEmployee);

module.exports = router;
