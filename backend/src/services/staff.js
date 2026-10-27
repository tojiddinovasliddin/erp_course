import pool from "../config/db.js"

class StaffServic{
   async createStaff(req,res) {
        const { fullname, phone, password } = req.body
       let check_user = await pool.query("select * from staff where phone = $1", [phone])
       if (check_user.rows.length) {
           return res.status(409).json({
               status: 409,
               message: "This phone already added"
           })

       }
       await pool.query("insert into staff(full_name,phone,password) values($1,$2,$3)", [fullname, phone, password])
       res.status(201).json({
           status: 201,
           message:"User added succefully"
       })
   }

    async deleteStaff(req, res) {
        const { staff_id } = req.params
        let check_user = await pool.query("select * from staff where id = $1", [staff_id])
        if (!check_user.rows.length) {
            return res.status(404).json({
                status: 404,
                message:"Staff not found"
            })
        }
        await pool.query("delete from staff where id = $1", [staff_id])
        res.status(200).json({
            status: 200,
            message:"Staff succefully deleted "
        })
    }
    async updateStaff(req, res) {
        const { staff_id } = req.params
        let check_user = await pool.query("select * from staff where id = $1", [staff_id])
        if (!check_user.rows.length) {
            return res.status(404).json({
                status: 404,
                message: "Staff not found"
            })
        }
    }
    // updateni qilsih ekrak 


}

let staffServic = new StaffServic()
export default staffServic
