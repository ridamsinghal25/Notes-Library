import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { UserRolesEnum } from "../constants.js";
import {
  createCourseValidator,
  deleteCourseValidator,
  getCourseByNameValidator,
  updateCourseValidator,
} from "../validators/course.validators.js";
import {
  createCourse,
  deleteCourse,
  getCourseByName,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyPermission([UserRolesEnum.ADMIN]));

router
  .route("/create-course")
  .post(createCourseValidator(), validate, createCourse);

router
  .route("/update-course")
  .patch(updateCourseValidator(), validate, updateCourse);

router
  .route("/delete-course")
  .delete(deleteCourseValidator(), validate, deleteCourse);

router
  .route("/get-courses")
  .post(getCourseByNameValidator(), validate, getCourseByName);

export default router;
