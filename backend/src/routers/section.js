import { Router } from "express";
import sectionControllers from "../controllers/section.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const section = Router()
section
    .post("/add/NewSection/:course_id",valudation.checkSection,authGuard, roleGuard("mentor",'admin'),sectionControllers.addNewSection)
    .put("/update/Section/:section_id",authGuard,roleGuard("mentor",'admin'),sectionControllers.updateSection)
    .get("/ACourse/all/Section/:course_id", authGuard, roleGuard("mentor", 'admin','student'),sectionControllers.allSection)
    .delete("/delete/ASection/:section_id", authGuard, roleGuard("mentor",'admin'),sectionControllers.deleteASection)

export default section
