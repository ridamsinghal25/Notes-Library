import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import { toggleNotesLike } from "../controllers/like.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/notes/:notesId")
  .post(mongoIdPathVariableValidator("notesId"), validate, toggleNotesLike);

export default router;
