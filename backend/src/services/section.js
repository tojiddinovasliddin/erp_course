import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"

class SectionServer {
    async addSection(req) {
        const { course_id } = req.params
        const { name } = req.body
        const mentor_id = req.user.id
        const check_course = await pool.query("select * from course where id = $1", [course_id])
        if (!check_course.rows.length) {
            throw new ErrorExteption(404,"Course not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id  where course.id = $1 and users.role = $2",[course_id,'mentor'])

        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409,"You can not add Section to this course")
        }
        await pool.query("insert into section(name,course_id) values($1,$2)", [name, course_id])
        return {
            status: 201,
            message:"Section added successfully"
        }
    }
    async updateSection(req) {
        const { section_id } = req.params
        const mentor_id = req.user.id
        const check_section = await pool.query("select * from section where id = $1", [section_id])
        if (!check_section.rows.length) {
            throw new ErrorExteption(404, "Section not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id where users.role=$1 and section.id = $2", ['mentor', section_id])
        console.log(check_mentor.rows, mentor_id)


        if (check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not update Section to this course")
        }
        const { name } = req.body


        await pool.query("update section set name =$1 where id = $2", [name, section_id])
        return {
            status: 201,
            message: "Section successfully updated"
        }

    }
    async allSection(req) {
        const { course_id } = req.params
        console.log(req.params.course_id)
        const mentor_id = req.user.id
        const check_course = await pool.query("select * from course where id = $1",[course_id])
        console.log(check_course.rows)
        if (!check_course.rows.length) {
            throw new Error(404,"Course not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id  where course.id = $1 and users.role = $2", [course_id, 'mentor'])
        const check_student = await pool.query("select student_course.student_id from course inner join section on section.course_id = course.id inner join student_course on student_course.course_id = course.id where course.id = $1", [course_id])

        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id && check_student.rows[0].student_id != mentor_id) {
            throw new ErrorExteption(409, "You can not show All Section in this course")
        }
        const allSection = await pool.query("select * from section where course_id = $1", [course_id])
        return {
            status: 200,
            data:allSection.rows
        }
    }
    async deleteASection(req) {
        const { section_id } = req.params
        const mentor_id = req.user.id
        const check_course = await pool.query("select * from section where id = $1", [section_id])
        if (!check_course.rows.length) {
            throw new ErrorExteption(404, "Section not found")
        }
        const check_mentor = await pool.query("select course.mentor_id from course inner join section on course.id = section.course_id where section.id = $1", [section_id])
        console.log(check_mentor.rows,mentor_id)
        if (req.user.role != 'admin'  && check_mentor.rows[0].mentor_id != mentor_id) {
            throw new ErrorExteption(409,"You can not delete this section")
        }
        await pool.query("delete from section where id =$1",[section_id])
        return {
            status: 200,
            message: "Section successfully deleted"
        }
    }
}

const sectionServer = new SectionServer()
export default sectionServer
