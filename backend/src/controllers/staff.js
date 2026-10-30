import staffServic from "../services/staff.js";

class StaffControllers{
    createStaff(req, res) {
        staffServic.createStaff(req,res)

    }
    deleteStaff(req, res) {

        staffServic.deleteStaff(req, res)

    }
    updateStaff(req, res){
        staffServic.updateStaff(req,res)
    }
    allStaffActive(req, res) {
        staffServic.allStaffActive(req,res)
    }
    allStaffInactive(req, res) {
        staffServic.allStaffInactive(req,res)
    }
    allStaff(req, res) {
        staffServic.allStaff(req,res)
    }
}
let staffControllers = new StaffControllers()
export default {
    staffControllers
}




