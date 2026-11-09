import { Router } from "express";
import materialControllers from "../controllers/material.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"


const material = Router()
material
    .post("/add/NewMaterial/:lesson_id",valudation.checkMaterial,authGuard, roleGuard("mentor","admin"),materialControllers.addNewMaterial)
    .put("/update/Material/:material_id",update_valudation.checkUpdateMaterial,authGuard,roleGuard("mentor","admin"),materialControllers.updateMaterial)
    .get("/ALesson/all/Material/:lesson_id", authGuard, roleGuard("mentor","admin","student"),materialControllers.allMaterial)
    .delete("/delete/AMaterial/:material_id", authGuard, roleGuard("mentor", "admin"), materialControllers.deleteMaterial)

export default material
