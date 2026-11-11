import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import argon from "argon2"
import path from "path"
import fs from "fs"

class StudentService {
    async addNewStudent(req) {
        const { fullname, phone,password} = req.body
        let check_user = await pool.query("select * from users where phone = $1", [phone])
        if (check_user.rows.length) {
            throw new ErrorExteption(409, "The user registered with this phone")
        }

        await pool.query("insert into users(fullname, phone, password,role)values($1,$2,$3,$4)",
            [fullname, phone, await argon.hash(password),'student']
        )
        return {
            status: 201,
            message: "The student successfully added"
        }
    }
    async connectCourseToStudet(req) {
        const {student_id} = req.params
        const { course_id } = req.body
        const checkStudentCourse = await pool.query("select * from student_course where student_id = $1 and course_id = $2", [student_id,course_id])
        if (checkStudentCourse.rows.length) {
            throw new ErrorExteption(409, "The student already added this course")
        }
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, 'student'])
        if (!check_student.rows.length) {
            throw new ErrorExteption(404,"Student not found")
        }
        const check_course = await pool.query("select student_cnt from course where id = $1", [course_id])
        if (!check_course.rows.length) {
            throw new ErrorExteption(404,"Couse not found")
        }
        let cnt = check_course > 0 ? check_course : 0
        cnt = cnt + 1
        await pool.query("update course set student_cnt = $1 where id = $2",[cnt,course_id])

        await pool.query("insert into student_course(student_id,course_id) values($1,$2)", [student_id, course_id])
        return {
            status: 201,
            message:"Student successfully added to course"
        }


    }
    async showAStudent(req) {
        const { student_id } = req.params
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, 'student'])
        if (!check_student.rows.length) {
            throw new ErrorExteption(409,"You are admin a student")
        }
        const student = await pool.query("select  users.fullname as student_name,users.phone,users.photo,users.role,users.create_at, count(student_course.id) as student_course_cnt from users inner join student_course on student_course.student_id = users.id where users.id = $1 group by users.id;",[student_id])
        return {
            status: 200,
            data:student.rows
        }
    }
    async deleteAStudentFromCourse(req) {
        const { student_id } = req.params
        const { course_id } = req.body
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, 'student'])
        if (!check_student.rows.length) {
            throw new ErrorExteption(409, "You are not a student")
        }
        const check_course = await pool.query("select student_cnt from course where id = $1", [course_id])
        if (!check_course.rows.length) {
            throw new ErrorExteption(404, "Couse not found")
        }
        const check_studentCourse = await pool.query("select * from student_course where student_id = $1 and status = $2", [student_id, 'inactive'])
        if (check_studentCourse.rows.length) {
            throw new ErrorExteption(404,"Student not found in this course")
        }
        let cnt = check_course > 0 ? check_course : 0
        cnt = cnt - 1
        await pool.query("update course set student_cnt = $1 where id = $2", [cnt, course_id])
        await pool.query("update student_course set status = 'inactive' where student_id = $1 and course_id = $2", [student_id, course_id])

        return {
            status: 201,
            mesage:"Student successfully delete from this course"
        }

    }
    async deleteStudent(req) {
        const { student_id } = req.params
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, 'student'])
        if (!check_student.rows.length) {
            throw new ErrorExteption(404,"You are not student")
        }
        const student = await pool.query("select * from student_course where student_id = $1 and status != $2", [student_id, 'active'])
        if (student.rows.length) {
            throw new ErrorExteption(404,"Student's courses not found")
        }
        await pool.query("update student_course set status = $1 where student_id = $2", ['inactive', student_id])
        return {
            status: 200,
            message:"The student delete successfully with their all courses"
        }
    }
    async showAllStudent(req) {
        const allStudent = await pool.query("select id,fullname as student_name,phone,photo,create_at,status from users where role = $1",['student'])
        return {
            status: 200,
            data:allStudent.rows
        }
    }
    async showAllActiveStudent(req) {
        const allStudent = await pool.query("select id,fullname as student_name,phone,photo,create_at,status  from users where role = $1 and status = $2" ,['student','active'])
        return {
            status: 200,
            data: allStudent.rows
        }
    }
    async showAllInactiveStudent(req) {
        const allStudent = await pool.query("select id,fullname as student_name,phone,photo,create_at,status  from users where role = $1 and status = $2", ['student', 'inactive'])
        return {
            status: 200,
            data: allStudent.rows
        }
    }
    async updateStudent(req) {
        const { student_id } = req.params
        const { fullname, phone, password } = req.body || {}
        const { photo } = req.files || {}
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, 'student'])
        if (!check_student.rows.length) {
            throw new ErrorExteption(400, "Student not found");
        }
        if (fullname) {
            await pool.query("update users set fullname = $1 where id = $2", [fullname, student_id])
        }
        if (phone) {
            await pool.query("update users set phone = $1 where id = $2", [phone, student_id])
        }
        if (password) {
            await pool.query("update users set password = $1 where id = $2", [argon.hash(password), student_id])
        }
        const check_photo = ["png", "jpg", "webp", "svg", "gif", "avif", "ico"]
        if (photo) {
            const photos = photo.name.split(".").at(-1)
            if (!check_photo.includes(photos)) {
                throw new ErrorExteption(415, "Unsupported media type")
            }
            else {
                let fileName = await pool.query("select photo from users where id =$1 and role = $2",[student_id,'student'])
                fileName = (fileName.rows[0].photo)
                console.log(fileName)
                await fs.promises.unlink(path.join(process.cwd(), "src", "uploads", "student", fileName),(error)=>console.log(error))
                await pool.query("update users set photo = $1 where id = $2", [new Date().getTime() + photo.name.split(".")[1], student_id])
                photo.mv(path.join(process.cwd(), "src", "uploads", "student", `${new Date().getTime() + path.extname(photo.name)}`), (error) => console.log(error))
            }
            return {
                status: 201,
                message: "Student successfully update"
            }
        }
    }

    async changeActiveStudent(req) {
        const { student_id } = req.params
        const check_mentor = await pool.query("select * from users where id = $1 and role = $2 and status !=$3", [student_id, 'student', 'active'])
        if (!check_mentor.rows.length) {
            throw new ErrorExteption(400, "Student not found")
        }
        await pool.query("update users set status = $1 where id = $2", ['active', student_id])
        return {
            status: 201,
            message: "Update successfully"
        }
    }
    async myCourses(req) {
        const { student_id } = req.params
        const check_student = await pool.query("select * from users where id = $1 and role = $2", [student_id, "student"])

        if (!check_student.rows.length) {
            throw new ErrorExteption(404,"YOU are not student")
        }
        if (check_student.rows[0].id != req.user.id) {
            throw new ErrorExteption(409,"You can not see the course")
        }
        const studentCourses = await pool.query("select student.fullname as student_name, student_course.course_id,student_course.student_id, student_course.create_at,course.banner as course_banner,course.name as course_name,mentor.fullname as mentor_name from student_course inner join course on student_course.course_id = course.id inner join users as mentor on mentor.id  = course.mentor_id left join users as student on student.id = student_course.student_id where student_course.student_id = $1",[student_id])
        return {
            status: 200,
            data:studentCourses.rows
        }
    }

}
const studentService = new StudentService()
export default studentService
