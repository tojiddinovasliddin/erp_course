import { Router } from "express";
import taskControllers from "../controllers/task.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"


const task = Router()
task
    .post("/add/NewTask/:lesson_id",valudation.checkTask,authGuard, roleGuard("mentor","admin"),taskControllers.addNewTask)
    .put("/update/Task/:task_id",update_valudation.checkUpdateTask,authGuard,roleGuard("mentor","admin"),taskControllers.updateTask)
    .get("/ALesson/all/Task/:lesson_id", authGuard, roleGuard("mentor","admin","student"),taskControllers.allTask)
    .delete("/delete/ATask/:task_id", authGuard, roleGuard("mentor","admin"),taskControllers.deleteTask)

export default task
