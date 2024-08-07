import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import {
  courseValidator,
  deleteCourseValidator,
  getCourseByNameValidator,
} from "../validators/course.validators.js";
import {
  createCourse,
  deleteCourse,
  getCourseByName,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-course").post(courseValidator(), validate, createCourse);

router.route("/update-course").post(courseValidator(), validate, updateCourse);

router
  .route("/delete-course")
  .delete(deleteCourseValidator(), validate, deleteCourse);

router
  .route("/get-course")
  .post(getCourseByNameValidator(), validate, getCourseByName);

export default router;
