import pool from "../config/db.js"
import staff from "../routers/admin.js"
import ErrorExteption from "../utils/error.js"
import argon2 from "argon2"
import path from "path"
import fs from "fs"



class StaffServic {
    async createStaff(req) {

        const { fullname, phone, password, role } = req.body
        let check_user = await pool.query("select * from users where phone = $1", [phone])
        if (check_user.rows.length) {
            throw new ErrorExteption(409, "The user registered with this phone")


        }
        await pool.query("insert into users(fullname,phone,password,role) values($1,$2,$3,$4)", [fullname, phone, await argon2.hash(password), role])
        return {
            status: 201,
            message: "The user added successfully"
        }
    }

    async deleteStaff(req) {
        const { staff_id } = req.params
        let check_user = await pool.query("select * from users where id = $1 and status = $2 and role = $3 ", [staff_id,'active','admin'])

        if (!check_user.rows.length) {
            throw new ErrorExteption(404, "Staff not found")
        }
        await pool.query("update users set status ='inactive' where id = $1", [staff_id])
        return {
            status: 200,
            message:"Staff successfully deleted"
        }
    }
    async updateStaff(req, res) {
        const { staff_id } = req.params
        const check_staff = await pool.query("select * from users where id = $1 and role = $2 and status = $3", [staff_id,'admin','active'])
        if (!check_staff.rows.length) {
            throw new ErrorExteption(400,"Staff not found");

        }
        const { fullname, phone, email, password } = req.body || {}
        const { photo } = req.files || {}
        if (fullname) {
            await pool.query("update users set fullname = $1 where id = $2", [fullname, staff_id])
        }
        if (phone) {
            await pool.query("update users set phone = $1 where id = $2", [phone, staff_id])
        }
        if (email) {
            await pool.query("update users set email = $1 where id = $2", [email, staff_id])
        }
        if (password) {
            await pool.query("update users set password = $1 where id = $2", [, staff_id])
        }
        if (photo) {

            await pool.query("update users set photo = $1 where id = $2", [new Date().getTime() + photo.name.split(".")[1], staff_id])
            photo.mv(path.join(process.cwd(), "src", "uploads","admin", `${new Date().getTime() + path.extname(photo.name)}`), (error) => console.log(error))

        }
        return {
            status: 201,
            message: "Staff successfully update"
        }
    }

    async allStaffActive(req) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = $1 and status = $2", ['admin', 'active'])
        return{
            status: 200,
            data:all_staff.rows
        }
    }
    async allStaffInactive(req) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = $1 and status = $2",['admin','inactive'])
        return{
            status: 200,
            data: all_staff.rows
        }
    }
    async allStaff(req) {
        let all_staff = await pool.query("select id,fullname,phone,photo,role,create_at,status from users where role = $1",['admin'])

        return{
            status: 200,
            data: all_staff.rows
        }
    }
    async changeActive(req) {
        const { staff_id } = req.params
        const check_mentor = await pool.query("select * from users where id = $1 and role = $2 and status !=$3", [staff_id, 'admin','active'])
        if (!check_mentor.rows.length) {
            throw new ErrorExteption(400, "Admin not found")
        }
        await pool.query("update users set status = $1 where id = $2", ['active', staff_id])
        return {
            status: 201,
            message:"Mentor status successfully changed"
        }
    }

}

const  staffServic = new StaffServic()
export default staffServic
