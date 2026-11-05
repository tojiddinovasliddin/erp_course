import staff from "./admin.js"
import mentor from "./mentor.js"
import auth from "./auth.js"
import category from "./category.js"
import course from "./course.js"
import assistant from "./assistant.js"
import student from "./student.js"

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


export default main_router
