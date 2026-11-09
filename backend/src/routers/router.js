import staff from "./admin.js"
import mentor from "./mentor.js"
import auth from "./auth.js"
import category from "./category.js"
import course from "./course.js"
import assistant from "./assistant.js"
import student from "./student.js"
import section from "./section.js"
import lesson from "./lessons.js"
import material from "./material.js"
import task from "./task.js"
import exam from "./exam.js"

import { Router } from "express"

const main_router = Router()

main_router
    .use("/erp/course", staff)
    .use("/erp/course", mentor)
    .use("/erp/course", auth)
    .use("/erp/course", category)
    .use("/erp/course", course)
    .use("/erp/course", assistant)
    .use("/erp/course", student)
    .use("/erp/course", section)
    .use("/erp/course", lesson)
    .use("/erp/course", material)
    .use("/erp/course", task)
    .use("/erp/course", exam)



export default main_router
