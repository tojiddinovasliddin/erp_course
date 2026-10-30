import { Router } from "express";
import Staff from "../controllers/staff.js"

const staff = Router()
staff
    .get("/allStaff/active", Staff.staffControllers.allStaffActive)
    .get("/allStaff/inactive", Staff.staffControllers.allStaffInactive)
    .get("/allStaff",Staff.staffControllers.allStaff)
    .post("/add/Newadmin",Staff.staffControllers.createStaff)
    .delete("/delete/deleteAdmin/:staff_id",Staff.staffControllers.deleteStaff)
    .put("/update/updateAdmin/:staff_id",Staff.staffControllers.updateStaff) // update codeni yozish kerak

export default staff
