import staff from "./staff.js"

import { Router } from "express"

const main_router = Router()

main_router
    .use("/erp/course", staff)



export default main_router
