import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import argon from "argon2"
import path from "path"

class AssistantService{
    async addNewAssistant(req) {
        const { fullname, phone,course_id,password,} = req.body
        const check_assistant = await pool.query("select * from users where phone = $1", [phone])
        if (check_assistant.rows.length) {
            throw new ErrorExteption(409, "The user registered with this phone")
        }

        await pool.query("insert into users(fullname, phone, course_id ,password,role)values($1,$2,$3,$4,$5)",
            [fullname, phone, course_id, await argon.hash(password), 'assistant']
        )
            return{
            status: 201,
            message:"The assistant successfully added"
        }
    }
    async updateAsistant(req) {
        const {assistant_id} = req.params
        const { fullname, phone,course_id,password} = req.body || {}
        const { photo } = req.files || {}
        const check_assistant = await pool.query("select * from users where id = $1 and role = $2", [assistant_id, 'assistant'])
        if (!check_assistant.rows.length) {
            throw new ErrorExteption(400, "Assistant not found");
        }
        if(fullname) {
            await pool.query("update users set fullname = $1 where id = $2",[fullname,assistant_id])
        }
        if(phone) {
            await pool.query("update users set phone = $1 where id = $2", [phone, assistant_id])
        }
        if(password) {
            await pool.query("update users set password = $1 where id = $2", [argon.hash(password),assistant_id])
        }
        const check_photo = ["png", "jpg", "webp", "svg", "gif", "avif", "ico"]
        if (photo) {
            const photos = photo.name.split(".").at(-1)
            if (!check_photo.includes(photos)) {
                throw new ErrorExteption(415, "Unsupported media type")
            }
            else {
                await pool.query("update users set photo = $1 where id = $2", [new Date().getTime() + photo.name.split(".")[1], assistant_id])
                photo.mv(path.join(process.cwd(), "src", "uploads", "assistant", `${new Date().getTime() + path.extname(photo.name)}`), (error) => console.log(error))
            }
        }
        return {
            status: 201,
            message:"Assistand successfully update"
        }

    }
    async deleteAssistant(req) {
        const { assistant_id } = req.params
        let check_user = await pool.query("select * from users where id = $1 and status = $2 and role = $3 ", [assistant_id, 'active', 'assistant'])

        if (!check_user.rows.length) {
            throw new ErrorExteption(404, "assistant not found")
        }
        await pool.query("update users set status ='inactive' where id = $1", [assistant_id])
        return {
            status: 200,
            message: "Assistand successfully deleted"
        }
    }
    async allAssistant(req) {
        const all_assistant = await pool.query("select users.id as users_id,users.fullname,course.name as course_name,users.photo,users.phone,users.role,users.create_at,users.status from users inner join course on users.id = course.assistant_id where users.role =$1",['assistant'])
        return{
            status: 200,
            message:all_assistant.rows
        }
    }
    async allAssistantActive(req) {
        const all_mentorActive = await pool.query("select users.id as users_id,users.fullname,course.name as course_name,users.photo,users.phone,users.role,users.create_at,users.status from users inner join course on users.id = course.assistant_id where users.role =$1  and users.status = $2",['assistant','active'])
        return{
            status: 200,
            message: all_mentorActive.rows
        }
    }
    async allAssistantInactive(req) {
        const all_assistantActive = await pool.query("select users.id as users_id,users.fullname,course.name as course_name,users.photo,users.phone,users.role,users.create_at,users.status from users inner join course on users.id = course.assistant_id where users.role =$1  and users.status = $2", ['assistant', 'inactive'])
        return{
            status: 200,
            message: all_assistantActive.rows
        }
    }
    async changeActive(req) {
        const { assistant_id } = req.params
        console.log(req.params)
        const check_assistant = await pool.query("select * from users where id = $1 and role = $2 and status !=$3", [assistant_id, 'assistant', 'active'])
        if (!check_assistant.rows.length) {
            throw new ErrorExteption(400, "Assistant not found")
        }
        await pool.query("update users set status = $1 where id = $2", ['active', assistant_id])
        return {
            status: 201,
            message:"Update successfully"
        }
    }
    async showA_assistant(req) {
        const { assistant_id } = req.params
        const check_assistant = await pool.query("select  * from users where id = $1 and role = $2", [assistant_id, "assistant"])
        if (!check_assistant.rows.length) {
            throw new ErrorExteption(404, "You are not assistant")
        }
        const aAssistantCourse = await pool.query("select users.fullname as assistant_name,users.photo,users.role,users.phone,users.create_at,course.name as course_name from users inner join course on users.id = course.assistant_id and users.role = $1 and users.id = $2", ['assistant',assistant_id])
        return {
            status: 200,
            data: aAssistantCourse.rows
        }
    }
}
const assistantService = new AssistantService()
export default assistantService
