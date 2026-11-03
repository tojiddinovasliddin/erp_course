import staff from "./admin.js"
import mentor from "./mentor.js"
import auth from "./auth.js"
import category from "./category.js"

import { Router } from "express"

const main_router = Router()

main_router
    .use("/erp/course", staff)
    .use("/erp/course", mentor)
    .use("/erp/course", auth)
    .use("/erp/course", category)


export default main_router
