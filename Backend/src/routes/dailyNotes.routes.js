import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { UserRolesEnum } from "../constants.js";
import {
  createMulter,
  handleMulterError,
} from "../middlewares/multer.middleware.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import {
  commonDailyNotesValidator,
  dailyNotePublicIdsValidator,
  dailyNotesChapterAndSubjectValidator,
  getDailyNotesValidator,
} from "../validators/dailyNotes.validators.js";
import {
  createDailyNotes,
  deleteChapterAllDailyNotes,
  deleteDailyNotes,
  deleteFilesOfDailyNotes,
  getDailyNotes,
  updateDailyNotes,
  updateFilesOfDailyNotes,
} from "../controllers/dailyNotes.controller.js";
import { notesSubjectValidator } from "../validators/notes.validators.js";

const router = Router();

router.use(verifyJWT);

const fileUpload = createMulter({
  fileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileSize: 5, // MB
}).array("notesFiles", 5);

router
  .route("/create-notes")
  .post(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.MODERATOR]),
    fileUpload,
    handleMulterError,
    commonDailyNotesValidator(),
    validate,
    createDailyNotes
  );

router
  .route("/update-notes/:dailyNotesId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.MODERATOR]),
    mongoIdPathVariableValidator("dailyNotesId"),
    commonDailyNotesValidator(),
    validate,
    updateDailyNotes
  );

router
  .route("/update-files/:dailyNotesId")
  .patch(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.MODERATOR]),
    fileUpload,
    handleMulterError,
    notesSubjectValidator(),
    mongoIdPathVariableValidator("dailyNotesId"),
    validate,
    updateFilesOfDailyNotes
  );

router
  .route("/delete-chapter")
  .delete(
    verifyPermission([UserRolesEnum.ADMIN]),
    dailyNotesChapterAndSubjectValidator(),
    validate,
    deleteChapterAllDailyNotes
  );

router
  .route("/delete-notes/:dailyNotesId")
  .delete(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.MODERATOR]),
    mongoIdPathVariableValidator("dailyNotesId"),
    validate,
    deleteDailyNotes
  );

router
  .route("/delete-files/:dailyNotesId")
  .delete(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.MODERATOR]),
    dailyNotePublicIdsValidator(),
    mongoIdPathVariableValidator("dailyNotesId"),
    validate,
    deleteFilesOfDailyNotes
  );

router
  .route("/get-notes")
  .get(getDailyNotesValidator(), validate, getDailyNotes);

export default router;
