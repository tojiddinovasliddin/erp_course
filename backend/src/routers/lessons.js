import { Router } from "express";
import lessonControllers from "../controllers/lessons.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const lesson = Router()
lesson
    .post("/add/NewLesson/:section_id",valudation.checkLesson,authGuard, roleGuard("mentor","admin"),lessonControllers.addNewLesson)
    .put("/update/Lesson/:lesson_id",update_valudation.checkUpdateLesson,authGuard,roleGuard("mentor","admin"),lessonControllers.updateLesson)
    .get("/ASection/all/Lesson/:section_id", authGuard, roleGuard("mentor","admin","student"),lessonControllers.allLesson)
    .delete("/delete/ALessons/:lesson_id", authGuard, roleGuard("mentor","admin"),lessonControllers.deleteALesson)

export default lesson
