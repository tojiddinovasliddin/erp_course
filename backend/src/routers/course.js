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
    .put("/delete/Course/:course_id", authGuard, roleGuard("admin"), courseControllers.deleteCourse)
    .put("/add/assistent/to/course/:course_id", authGuard, roleGuard("admin"), courseControllers.addAssistent)
    .delete("/delete/assistent/to/course/:course_id", authGuard, roleGuard("admin"), courseControllers.deleteAssistent)
    .get("/all/Course", authGuard, roleGuard("admin"), courseControllers.allCourse)
    .get("/all/CourseActive", courseControllers.allCourseActive)
    .get("/all/CourseInactive", authGuard, roleGuard("admin"), courseControllers.allCourseInactive)
    .get("/show/aCourse/:course_id", authGuard, courseControllers.showAcourse)
    .get("/show/ACategory/AllCourse/:category_id", courseControllers.showAllCourseACategory)





export default course
