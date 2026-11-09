import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import path from "path"

class TaskService {
    async addTask(req) {
        const { lesson_id } = req.params
        const { task } = req.body
        const { file } = req.files
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"lesson not found")
        }
        const check_tasks = ["svg", "png", "jpg", "jpeg", "pdf","doc","docx","xls",]
        const tasks = file.name.split(".").at(-1)
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id where users.role = $1 and lesson.id = $2", ['mentor',lesson_id])
        console.log(check_mentor.rows)
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409,"You can not add task to this lesson")
        }
        if (!check_tasks.includes(tasks)){
            throw new ErrorExteption(415, "Unsupported Media Type");
        }
        file.mv(path.join(process.cwd(), "src", "uploads", "task",`${new Date().getTime() + '.' + tasks}`), (error) => console.log(error))
        await pool.query("insert into task(lesson_id,task, file) values($1, $2, $3)",
            [lesson_id, task, `${new Date().getTime() + '.' + tasks}`])
        return {
            status: 201,
            message:"Task successfully added"
        }

    }
    async updateTask(req) {
        const { task_id } = req.params
        const { task} = req.body ||{}
        const { file } = req.files||{}
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from task where id = $1", [task_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404, " Task not found")
        }
        const check_mentor = await pool.query(" select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join task on task.lesson_id = lesson.id where task.id =$1 and users.role = $2", [task_id,'mentor'])
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not update task to this lesson")
        }
        const check_task = ["svg", "png", "jpg", "jpeg", "pdf", "doc", "docx",]
        if (file) {
            const tasks = file.name.split(".").at(-1)
            if (!check_task.includes(tasks)) {
                throw new ErrorExteption(415, "Unsupported media type")
            }
            else {
                await pool.query("update task set file = $1 where id = $2", [new Date().getTime() + file.name.split(".")[1],task_id])
                file.mv(path.join(process.cwd(), "src", "uploads", "lesson", `${new Date().getTime() + path.extname(file.name)}`), (error) => console.log(error))
            }
        }
        if (task) {
            await pool.query("update task set task = $1 where id = $2", [task, task_id])
        }
        return {
            status: 201,
            message:"Lessons update successfully"
        }
    }
    async allTask(req) {
        const { lesson_id } = req.params
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from task where lesson_id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"Before seeing task, you add lesson")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join task on task.lesson_id = lesson.id where users.role = $1 and lesson.id = $2",['mentor',lesson_id])
        const check_student = await pool.query("select student_course.student_id from course inner join section on section.course_id = course.id inner join student_course on student_course.course_id = course.id inner join lesson on lesson.section_id = section.id inner join task on task.lesson_id  = lesson.id where task.lesson_id = $1", [lesson_id])

        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id && check_student.rows[0].student_id!= mentor_id) {
            throw new ErrorExteption(409, "You can not see  tasks")
        }
        const allACourseLesson = await pool.query("select * from task where lesson_id  = $1", [lesson_id])
        return {
            status: 200,
            data: allACourseLesson.rows
        }

    }
    async deleteTask(req) {
        const { task_id } = req.params
        const mentor_id = req.user.id
        const check_task = await pool.query("select * from task where id = $1", [task_id])
        if (!check_task.rows.length) {
            throw new ErrorExteption(404, "Task not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join task on task.lesson_id = lesson.id  where users.role = $1 and task.id = $2", ['mentor', task_id])
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not delete task")
        }
        await pool.query("delete from task where id =$1",[task_id])
        return {
            status: 200,
            message: "Task successfully deleted"
        }
    }
}

const taskService = new TaskService()
export default taskService
