import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { UserRolesEnum } from "../constants.js";
import {
  getNotesBySubjectValidator,
  uploadUpdateNoteValidator,
} from "../validators/notes.validators.js";
import { handleMulterError, upload } from "../middlewares/multer.middleware.js";
import {
  deleteNotes,
  getNotesBySubject,
  updateNotes,
  uploadNotes,
} from "../controllers/notes.controller.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/upload-notes")
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.single("pdfFile"),
    handleMulterError,
    uploadUpdateNoteValidator(),
    validate,
    uploadNotes
  );

router
  .route("/update-notes/:notesId")
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.single("pdfFile"),
    handleMulterError,
    uploadUpdateNoteValidator(),
    mongoIdPathVariableValidator("notesId"),
    validate,
    updateNotes
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
  .route("/get-notes")
  .post(getNotesBySubjectValidator(), validate, getNotesBySubject);

export default router;
