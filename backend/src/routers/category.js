import { Router } from "express";
import categoryControllers from "../controllers/category.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const category = Router()
category
    .get("/category/all", authGuard, roleGuard("admin"), categoryControllers.AllCategory)
    .get("/category/allActive", authGuard, roleGuard("admin"), categoryControllers.AllActiceCategory)
    .get("/category/allInactive", authGuard, roleGuard("admin"), categoryControllers.AllInacticeCategory)
    .post("/category/addNew", authGuard, roleGuard("admin"), valudation.checkCategory, categoryControllers.createCategory)
    .delete("/category/deleteCategory/:category_id", authGuard, roleGuard("admin","mentor"),categoryControllers.deleteCategory)
    .put("/category/toActive/:category_id", authGuard, roleGuard("admin"), categoryControllers.changeActive)
    .put("/category/update/:category_id", authGuard, roleGuard("admin"), update_valudation.checkUpdateCategory,categoryControllers.updateCategory)



export default category
