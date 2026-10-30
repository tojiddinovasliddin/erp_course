import pool from "../config/db.js"
import argon2 from "argon2"

class StaffServic{
   async createStaff(req,res) {
        const { fullname, phone, password,role } = req.body
       let check_user = await pool.query("select * from users where phone = $1", [phone])
       console.log(check_user.rows)
       if (check_user.rows.length) {
           return res.status(409).json({
               status: 409,
               message: "The user registered with this phone"
           })

       }
       await pool.query("insert into users(fullname,phone,password,role) values($1,$2,$3,$4)", [fullname, phone,await argon2.hash(password),role])
       res.status(201).json({
           status: 201,
           message:"The user added successfully"
       })
   }

    async deleteStaff(req, res) {
        const { staff_id } = req.params
        let check_user = await pool.query("select * from users where id = $1 and status = 'active'", [staff_id])

        if (!check_user.rows.length) {
            return res.status(404).json({
                status: 404,
                message:"Staff not found"
            })
        }
        await pool.query("update users set status ='inactive' where id = $1", [staff_id])
        res.status(200).json({
            status: 200,
            message:"Staff successfully deleted"
        })
    }
    async updateStaff(req, res) {
        const { staff_id } = req.params
        const {} = req.body
        let check_user = await pool.query("select id,fullname,phone,password,photo,role from users where id = $1 and role = 'admin'", [staff_id])
        console.log(check_user.rows)
        if (!check_user.rows.length) {
            return res.status(404).json({
                status: 404,
                message: "Staff not found"
            })
        }
    }
    // updateni qilsih kerak

    async allStaffActive(req, res) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = 'admin' and status ='active'")

        return res.status(200).json({
            status: 200,
            data:all_staff.rows
        })
    }
    async allStaffInactive(req, res) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = 'admin' and status = 'inactive'")

        return res.status(200).json({
            status: 200,
            data: all_staff.rows
        })
    }
    async allStaff(req, res) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = 'admin' ")

        return res.status(200).json({
            status: 200,
            data: all_staff.rows
        })
    }
}

let staffServic = new StaffServic()
export default staffServic
