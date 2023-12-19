const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  acceptDocument,
  rejectDocument,
  uploadFile,
  checkDocument,
  findUncheckedDocuments,
  findcheckedDocuments,
} = require("../controllers/documentController");

router
  .route("/checkdocument/:id")
  .patch(authenticateUser, authorizePermissions("screener"), checkDocument);
router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin", "manager"),
    getAllDocuments
  );
router.route("/uploadFile").post(uploadFile);
router.route("/apply").post(createDocument);
router
  .route("/getunchecked")
  .get(
    authenticateUser,
    authorizePermissions("screener"),
    findUncheckedDocuments
  );
router
  .route("/getchecked")
  .get(authenticateUser, authorizePermissions("admin"), findcheckedDocuments);
router
  .route("/acceptDocument/:id")
  .patch(
    authenticateUser,
    authorizePermissions("admin", "manager"),
    acceptDocument
  );
router
  .route("/rejectDocument/:id")
  .delete(
    authenticateUser,
    authorizePermissions("admin", "manager"),
    rejectDocument
  );
router.route("/:id").get(authenticateUser, getSingleDocument);

module.exports = router;
