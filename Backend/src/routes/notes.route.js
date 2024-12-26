import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { UserRolesEnum } from "../constants.js";
import {
  getNotesBySubjectValidator,
  uploadUpdateNoteValidator,
} from "../validators/notes.validators.js";
import {
  createMulter,
  handleMulterError,
} from "../middlewares/multer.middleware.js";
import {
  deleteNotes,
  getNotesBySubject,
  getNotesLikedByUser,
  getNotesUploadedByUser,
  updateNotesDetails,
  updateNotesPdfFile,
  uploadNotes,
} from "../controllers/notes.controller.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

const pdfUpload = createMulter({
  fileTypes: ["application/pdf"],
  fileSize: 10,
}).single("pdfFile");

router
  .route("/upload-notes")
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    pdfUpload,
    handleMulterError,
    uploadUpdateNoteValidator(),
    validate,
    uploadNotes
  );

router
  .route("/update-notes/:notesId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN]),
    uploadUpdateNoteValidator(),
    mongoIdPathVariableValidator("notesId"),
    validate,
    updateNotesDetails
  );

router
  .route("/delete-notes/:notesId")
  .delete(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("notesId"),
    validate,
    deleteNotes
  );

router
  .route("/get-subject-notes")
  .post(getNotesBySubjectValidator(), validate, getNotesBySubject);

router
  .route("/get-user-notes")
  .get(verifyPermission([UserRolesEnum.ADMIN]), getNotesUploadedByUser);

router.route("/get-liked-notes").get(getNotesLikedByUser);

router
  .route("/update-pdffile/:notesId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN]),
    pdfUpload,
    handleMulterError,
    mongoIdPathVariableValidator("notesId"),
    validate,
    updateNotesPdfFile
  );

export default router;
