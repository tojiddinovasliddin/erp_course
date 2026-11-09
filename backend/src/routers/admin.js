import { Router } from "express";
import valudation from "../middleware/valudation.js";
import Staff from "../controllers/admin.js"
import update_valudation from "../middleware/update_valudation.js";
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"


const staff = Router()
staff
    .get("/allStaff/active", authGuard,roleGuard("admin"),Staff.staffControllers.allStaffActive)
    .get("/allStaff/inactive", authGuard, roleGuard("admin"),Staff.staffControllers.allStaffInactive)
    .get("/allStaff", authGuard, roleGuard("admin"), Staff.staffControllers.allStaff)
    .post("/add/Newadmin", authGuard, roleGuard("admin"), valudation.checkAdmin,Staff.staffControllers.createStaff)
    .put("/delete/deleteAdmin/:staff_id", authGuard, roleGuard("admin"), Staff.staffControllers.deleteStaff)
    .put("/update/updateAdmin/:staff_id", authGuard, roleGuard("admin"), update_valudation.checkUpdateAdmin,Staff.staffControllers.updateStaff)
    .put("/change/AdmintoActive/:staff_id", authGuard, roleGuard("admin"), Staff.staffControllers.changeToActive)

export default staff


