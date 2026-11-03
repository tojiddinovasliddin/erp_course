import { Router } from "express";
import categoryControllers from "../controllers/category.js";
import valudation from "../middleware/valudation.js";
import update_valudation from "../middleware/update_valudation.js"

const category = Router()
category
    .get("/category/all", categoryControllers.AllCategory)
    .get("/category/allActive", categoryControllers.AllActiceCategory)
    .get("/category/allInactive", categoryControllers.AllInacticeCategory)
    .post("/category/addNew", valudation.checkCategory, categoryControllers.createCategory)
    .delete("/category/deleteCategory/:category_id", categoryControllers.deleteCategory)
    .put("/category/toActive/:category_id",categoryControllers.changeActive)



export default category
