const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAdminFromUser,
  getAllUsers,
  getSingleUser,
  updateUserByAdmin,
  showCurrentUser,
  updateUser,
  updateProfile,
  updateUserPassword,
  uploadImage,
} = require("../controllers/usersController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "manager"), getAllUsers);

router.route("/uploadImage").post(uploadImage);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router
  .route("/updateUser/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateUser);
router.route("/updateProfile/:id").patch(authenticateUser, updateProfile);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/getsingle/:id").get(authenticateUser, getSingleUser);
router
  .route("/getadmins")
  .get(
    authenticateUser,
    authorizePermissions("agent", "admin"),
    getAdminFromUser
  );
router
  .route("/updateUserByAdmin/:userId")
  .patch(authenticateUser, authorizePermissions("admin"), updateUserByAdmin);

module.exports = router;
