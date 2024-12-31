import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/validate.js";
import { UserRolesEnum } from "../constants.js";
import {
  createCourseValidator,
  updateCourseValidator,
} from "../validators/course.validators.js";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import { verifyPasswordValidator } from "../validators/user.validators.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyPermission([UserRolesEnum.ADMIN]));

router
  .route("/create-course")
  .post(createCourseValidator(), validate, createCourse);

router
  .route("/update-course/:courseId")
  .patch(
    mongoIdPathVariableValidator("courseId"),
    updateCourseValidator(),
    validate,
    updateCourse
  );

router
  .route("/delete-course/:courseId")
  .delete(
    mongoIdPathVariableValidator("courseId"),
    verifyPasswordValidator(),
    validate,
    deleteCourse
  );

router.route("/get-courses").get(getCourses);

export default router;
