import staffServic from "../services/admin.js";

class StaffControllers{
    async createStaff(req, res,next) {
        try {
            const data = await staffServic.createStaff(req, next)
            return res.status(data.status).json(data)
        } catch (error) {

            return next(error)
        }
    }
    async deleteStaff(req, res,next) {
       try {
           const data = await staffServic.deleteStaff(req,next)
           return res.status(data.status).json(data)
       } catch (error) {
            return next(error)
       }

    }
    async updateStaff(req, res,next) {
      try {
          const data = await staffServic.updateStaff(req)
          return res.status(data.status).json(data)
      } catch (error) {

         return next(error)
      }
    }
    async allStaffActive(req, res) {
       try {
           const data = await staffServic.allStaffActive(req)
           return res.status(data.status).json(data)
       } catch (error) {
        return next(error)
       }
    }
    async allStaffInactive(req,res,next) {
       try {
           const data = await staffServic.allStaffInactive(req,next)
            console.log(data)
           return res.status(data.status).json(data)

       } catch (error) {
           return next(error)
       }
    }
    async allStaff(req, res) {
      try {
          const data = await staffServic.allStaff(req)
          return res.status(data.status).json(data)
      } catch (error) {
          return next(error)
      }
    }
    async changeToActive(req, res, next) {
        try {
            const data = await staffServic.changeActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }

}
let staffControllers = new StaffControllers()
export default {
    staffControllers
}




