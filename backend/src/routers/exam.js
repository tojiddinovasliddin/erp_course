import { Router } from "express";
import examControllers from "../controllers/exam.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"


const exam = Router()
exam
    .post("/add/NewExam/:lesson_id",valudation.checkExam,authGuard, roleGuard("mentor","admin"),examControllers.addNewExam)
    .put("/update/Exam/:exam_id",update_valudation.checkUpdateExam,authGuard,roleGuard("mentor","admin"),examControllers.updateExam)
    .get("/ALesson/all/Exam/:lesson_id", authGuard, roleGuard("mentor","admin","student"),examControllers.allExam)
    .delete("/delete/AnExam/:exam_id", authGuard, roleGuard("mentor", "admin"), examControllers.deleteExam)
    .post("/answer/Exam/question/:lesson_id",valudation.checkAnswerExam ,authGuard,roleGuard("student"),examControllers.addAnswerToExam)

export default exam
