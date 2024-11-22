import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import { commentContentValidator } from "../validators/comment.validators.js";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/create-comment/:notesId")
  .post(
    commentContentValidator(),
    mongoIdPathVariableValidator("notesId"),
    validate,
    createComment
  );

router
  .route("/edit-comment/:commentId")
  .patch(
    commentContentValidator(),
    mongoIdPathVariableValidator("commentId"),
    validate,
    editComment
  );

router
  .route("/delete-comment/:commentId")
  .delete(mongoIdPathVariableValidator("commentId"), validate, deleteComment);

router
  .route("/get-comments/:notesId")
  .get(mongoIdPathVariableValidator("notesId"), validate, getComments);

export default router;
