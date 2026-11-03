import { Router } from "express";
import valudation from "../middleware/valudation.js";
import Staff from "../controllers/admin.js"
import checkToken from "../guards/auth.js"
import update_valudation from "../middleware/update_valudation.js";

const staff = Router()
staff
    .get("/allStaff/active",Staff.staffControllers.allStaffActive)
    .get("/allStaff/inactive", Staff.staffControllers.allStaffInactive)
    .get("/allStaff",Staff.staffControllers.allStaff)
    .post("/add/Newadmin",valudation.checkAdmin,Staff.staffControllers.createStaff)
    .delete("/delete/deleteAdmin/:staff_id",Staff.staffControllers.deleteStaff)
    .put("/update/updateAdmin/:staff_id",update_valudation.checkUpdateAdmin,Staff.staffControllers.updateStaff)
    .put("/change/AdmintoActive/:staff_id", Staff.staffControllers.changeToActive)

export default staff
