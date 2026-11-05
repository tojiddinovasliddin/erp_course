import { Router } from "express";
import valudation from "../middleware/valudation.js";
import courseControllers from "../controllers/course.js";
import update_valudation from "../middleware/update_valudation.js";
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const course = Router()
course
    .post("/add/NewCourse", authGuard, roleGuard("admin"),valudation.checkCourse,courseControllers.createCourse)
    .put("/change/CoursetoActive/:course_id", authGuard, roleGuard("admin"), courseControllers.changeToActive)
    .put("/update/Course/:course_id", update_valudation.checkUpdateCategory, authGuard, roleGuard("admin"), courseControllers.updateCourse)
    .put("/add/assistent/to/course/:course_id", authGuard, roleGuard("admin"), courseControllers.addAssistent)
    .get("/all/Course", authGuard, roleGuard("admin"), courseControllers.allCourse)
    .get("/all/CourseActive", authGuard, roleGuard("admin"), courseControllers.allCourseActive)
    .get("/all/CourseInactive", authGuard, roleGuard("admin"), courseControllers.allCourseInactive)
    .get("/show/aCourse/:course_id", authGuard, roleGuard("admin","mentor","assistant"),courseControllers.showAcourse)
    .delete("/delete/Course/:course_id", authGuard, roleGuard("admin","mentor","assistant"), courseControllers.deleteCourse)
    .delete("/delete/assistent/to/course/:course_id", authGuard, roleGuard("admin"),courseControllers.deleteAssistent)

export default course
