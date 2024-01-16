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
  getSingleDocumentByNationalId,
  acceptDocument,
  rejectDocument,
  rejectDocumentByAdmin,
  uploadFile,
  checkDocument,
  findUncheckedDocuments,
  findcheckedDocuments,
  updatedDocumentByNationalId,
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
  .patch(authenticateUser, authorizePermissions("admin"), acceptDocument);
router
  .route("/rejectDocument/:documentId")
  .patch(
    authenticateUser,
    authorizePermissions("admin", "screener"),
    rejectDocument
  );
router
  .route("/rejectDocumentByAdmin/:documentId")
  .patch(
    authenticateUser,
    authorizePermissions("admin", "screener"),
    rejectDocumentByAdmin
  );
router.route("/:id").get(authenticateUser, getSingleDocument);
router
  .route("/getbynationalId/:nationalId")
  .get(authenticateUser, getSingleDocumentByNationalId);
router
  .route("/updatedDocumentByNationalId/:nationalId")
  .patch(authenticateUser, updatedDocumentByNationalId);

module.exports = router;
