import pool from "../config/db.js";
import staffServic from "../services/staff.js";

class StaffControllers{
    createStaff(req, res) {
        return staffServic.createStaff(req,res)

    }
    deleteStaff(req, res) {

        return staffServic.deleteStaff(req, res)

    }
    updateStaff(req, res){
        return staffServic.updateStaff(req,res)
    }
}
let staffControllers = new StaffControllers()
export default {
    staffControllers
}




