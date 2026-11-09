import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import path from "path"

class LessonServer {
    async addLesson(req) {
        const { section_id } = req.params
        const { name, description } = req.body
        const { video } = req.files
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from section where id = $1", [section_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"Section not found")
        }
        const check_video = ["mp4", "mpeg", "mov", "avi", "mkv", "webm", "ogv", "3gp", "wmv", "flv"]
        const videos = video.name.split(".").at(-1)
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id where users.role = $1 and section.id = $2", ['mentor',section_id])

        if (req.user.role !='admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409,"You can not add lesson to this section")
        }
        if (!check_video.includes(videos)){
            throw new ErrorExteption(415, "Unsupported Media Type");
        }
        video.mv(path.join(process.cwd(), "src", "uploads", "lesson",`${new Date().getTime() + '.' + videos}`), (error) => console.log(error))
        await pool.query("insert into lesson(section_id, name, description, video) values($1, $2, $3, $4)",
            [section_id, name, description, `${new Date().getTime() + '.' + videos}`])
        return {
            status: 201,
            message:"Lesson successfully added"
        }

    }
    async updateLesson(req) {
        const { lesson_id } = req.params
        const { name, description } = req.body || {}
        const { video } = req.files || {}
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id,])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404, " Lesson not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id where users.role = $1", ['mentor'])
        if (req.user.role !='admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not update lesson")
        }
        const check_video = ["mp4", "mpeg", "mov", "avi", "mkv", "webm", "ogv", "3gp", "wmv", "flv"]
        if (video) {
            const videos = video.name.split(".").at(-1)
            if (!check_video.includes(videos)) {
                throw new ErrorExteption(415, "Unsupported media type")
            }
            else {
                await pool.query("update lesson set video = $1 where id = $2", [new Date().getTime() + video.name.split(".")[1],lesson_id])
                video.mv(path.join(process.cwd(), "src", "uploads", "lesson", `${new Date().getTime() + path.extname(video.name)}`), (error) => console.log(error))
            }
        }
        if (name) {
            await pool.query("update lesson set name = $1 where id = $2", [name, lesson_id])
        }
        if (description) {
            await pool.query("update lesson set description = $1 where id = $2", [description, lesson_id])
        }
        return {
            status: 201,
            message:"Lessons update successfully"
        }
    }
    async allLesson(req) {
        const { section_id } = req.params
        const mentor_id = req.user.id
        const check_section = await pool.query("select * from section where id = $1", [section_id])
        if (!check_section.rows.length) {
            throw new ErrorExteption(404,"Section not found")
        }
        const check_mentor = await pool.query("select course.mentor_id from section inner join course on course.id = section.course_id  where section.id = $1",[section_id])
        const check_student = await pool.query("select student_course.student_id from course inner join section on section.course_id = course.id inner join student_course on student_course.course_id = course.id inner join lesson on lesson.section_id = section.id where section.id = $1",[section_id])

        if (req.user.role != 'admin' && check_mentor.rows[0].mentor_id != mentor_id && check_student.rows[0].student_id != mentor_id) {
            throw new ErrorExteption(409, "You can not see lesson  of this section")
        }
        const allACourseLesson = await pool.query("select * from lesson where section_id  = $1", [section_id])
        return {
            status: 200,
            data: allACourseLesson.rows
        }

    }
    async deleteALesson(req) {
        const { lesson_id } = req.params
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404, "Lesson not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id where users.role = $1",['mentor'])
        console.log(check_mentor.rows[0].mentor_id)
        if (req.user.role !='admin'&& mentor_id != check_mentor.rows[0].mentor_id) {
            throw new ErrorExteption(409,"You can not delete the course")
        }
        await pool.query("delete from lesson where id =$1",[lesson_id])
        return {
            status: 200,
            message: "Section successfully deleted"
        }
    }
}

const lessonServer = new LessonServer
export default lessonServer
