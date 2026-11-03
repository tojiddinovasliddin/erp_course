import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import argon from "argon2"
import path from "path"

class MentorService{
    async addNewMentor(req) {
        const { fullname, phone, password, experience, job, website, info, facebook, telegram, instagram, linkedin, github, role } = req.body
        let check_user = await pool.query("select * from users where phone = $1", [phone])
        if (check_user.rows.length) {
            throw new ErrorExteption(409, "The user registered with this phone")
        }
        await pool.query("insert into users(fullname, phone, password, experience, job, website, info, facebook, telegram, instagram, linkedin, github, role)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
            [fullname, phone, password,  experience, job, website, info, facebook, telegram, instagram, linkedin, github, role]
        )
            return{
            status: 201,
            message:"The mentor successfully added"
        }
    }
    async updateMentor(req) {
        const {mentor_id} = req.params
        const { fullname, phone, password, experience, job, website, info, facebook, telegram, instagram, linkedin, github} = req.body || {}
        const { photo } = req.files || {}
        const check_mentor = await pool.query("select * from users where id = $1 and role = $2", [mentor_id, 'mentor'])
        if (!check_mentor.rows.length) {
            throw new ErrorExteption(400, "Mentor not found");
        }
        if(fullname) {
            await pool.query("update users set fullname = $1 where id = $2",[fullname,mentor_id])
        }
        if(phone) {
            await pool.query("update users set phone = $1 where id = $2", [phone, mentor_id])
        }
        if(password) {
            await pool.query("update users set password = $1 where id = $2", [argon.hash(password),mentor_id])
        }
        if(experience) {
            await pool.query("update users set experience = $1 where id = $2", [experience,mentor_id])
        }
        if(job) {
            await pool.query("update users set job = $1 where id = $2", [job, mentor_id])
        }
        if(website) {
            await pool.query("update users set website = $1 where id = $2", [website, mentor_id])
        }
        if(info) {
            await pool.query("update users set info = $1 where id = $2", [info, mentor_id])
        }
        if (telegram) {
            await pool.query("update users set telegram = $1 where id = $2", [telegram, mentor_id])
        }
        if (instagram) {
            await pool.query("update users set instagram = $1 where id = $2", [instagram, mentor_id])
        }
        if (linkedin) {
            await pool.query("update users set linkedin = $1 where id = $2", [linkedin, mentor_id])
        }
        if (github) {
            await pool.query("update users set github = $1 where id = $2", [github, mentor_id])
        }
        if (photo) {
            await pool.query("update users set photo = $1 where id = $2", [new Date().getTime() + photo.name.split(".")[1], mentor_id])
            photo.mv(path.join(process.cwd(), "src", "uploads", "mentor", `${new Date().getTime() + path.extname(photo.name)}`), (error) => console.log(error))

        }
        return {
            status: 201,
            message:"Mentor successfully update"
        }

    }
    async deleteMentor(req) {
        const { mentor_id } = req.params
        let check_user = await pool.query("select * from users where id = $1 and status = $2 and role = $3 ", [mentor_id, 'active', 'mentor'])

        if (!check_user.rows.length) {
            throw new ErrorExteption(404, "Mentor not found")
        }
        await pool.query("update users set status ='inactive' where id = $1", [mentor_id])
        return {
            status: 200,
            message: "Mentor successfully deleted"
        }
    }
    async allMentor(req) {
        let all_mentor = await pool.query("select * from users where role ilike 'mentor'")
        return{
            status: 200,
            message:all_mentor.rows
        }
    }
    async allMentorActive(req) {
        let all_mentorActive = await pool.query("select * from users where role ilike 'mentor' and status = 'active'")
        return{
            status: 200,
            message: all_mentorActive.rows
        }
    }
    async allMentorInactive(req) {
        let all_mentorActive = await pool.query("select * from users where role ilike 'mentor' and status = 'inactive'")
        return{
            status: 200,
            message: all_mentorActive.rows
        }
    }
    async changeActive(req) {
        const { mentor_id } = req.params
        console.log(mentor_id)
        console.log(req.params)
        const check_mentor = await pool.query("select * from users where id = $1 and role = $2 and status !=$3", [mentor_id, 'mentor', 'active'])
        console.log(check_mentor)
        if (!check_mentor.rows.length) {
            throw new ErrorExteption(400, "Mentor not found")
        }
        await pool.query("update users set status = $1 where id = $2", ['active', mentor_id])
        return {
            status: 201,
            message:"Update successfully"
        }
    }

}
const mentorService = new MentorService()
export default mentorService
