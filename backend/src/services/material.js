import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import path from "path"

class MaterialService {
    async addMaterial(req) {
        const { lesson_id } = req.params
        const { description } = req.body
        const { file } = req.files
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"lesson not found")
        }
        const check_material = ["svg", "png", "jpg", "jpeg", "pdf","doc","docx",]
        const material = file.name.split(".").at(-1)
        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id where users.role = $1 and lesson.id = $2", ['mentor',lesson_id])
        console.log(check_mentor.rows)
        if (req.user.role !='admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409,"You can not add material to this lesson")
        }
        if (!check_material.includes(material)){
            throw new ErrorExteption(415, "Unsupported Media Type");
        }
        file.mv(path.join(process.cwd(), "src", "uploads", "material",`${new Date().getTime() + '.' + material}`), (error) => console.log(error))
        await pool.query("insert into material(lesson_id,description, file) values($1, $2, $3)",
            [lesson_id, description, `${new Date().getTime() + '.' + material}`])
        return {
            status: 201,
            message:"Material successfully added"
        }

    }
    async updateMaterial(req) {
        const { material_id } = req.params
        const { description } = req.body ||{}
        const { file } = req.files||{}
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from material where id = $1", [material_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404, " Material not found")
        }
        const check_mentor = await pool.query(" select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join material on material.lesson_id = lesson.id where material.id =$1 and users.role = $2", [material_id,'mentor'])
        console.log(check_mentor.rows)
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not update material to this lesson")
        }
        const check_material = ["svg", "png", "jpg", "jpeg", "pdf", "doc", "docx",]
        if (file) {
            const material = file.name.split(".").at(-1)
            if (!check_material.includes(material)) {
                throw new ErrorExteption(415, "Unsupported media type")
            }
            else {
                await pool.query("update material set file = $1 where id = $2", [new Date().getTime() + file.name.split(".")[1],material_id])
                video.mv(path.join(process.cwd(), "src", "uploads", "lesson", `${new Date().getTime() + path.extname(video.name)}`), (error) => console.log(error))
            }
        }
        if (description) {
            await pool.query("update material set description = $1 where id = $2", [description, material_id])
        }
        return {
            status: 201,
            message:"Lessons update successfully"
        }
    }
    async allMaterial(req) {
        const { lesson_id } = req.params
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from material where lesson_id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"Before seeing material, you add lesson")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join material on material.lesson_id = lesson.id where users.role = $1 and lesson.id = $2",['mentor',lesson_id])
        const check_student = await pool.query("select student_course.student_id from course inner join section on section.course_id = course.id inner join student_course on student_course.course_id = course.id inner join lesson on lesson.section_id = section.id inner join material on material.lesson_id  = lesson.id where material.lesson_id = $1",[lesson_id] )

        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id && check_student.rows[0] != mentor_id) {
            throw new ErrorExteption(409, "You can not see material of this section")
        }
        const allACourseLesson = await pool.query("select * from material where lesson_id  = $1", [lesson_id])
        return {
            status: 200,
            data: allACourseLesson.rows
        }

    }
    async deleteMaterial(req) {
        const { material_id } = req.params
        const mentor_id = req.user.id
        const check_material = await pool.query("select * from material where id = $1", [material_id])
        if (!check_material.rows.length) {
            throw new ErrorExteption(404, "Material not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join material on material.lesson_id = lesson.id  where users.role = $1 and material.id = $2", ['mentor', material_id])
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not delete material")
        }
        await pool.query("delete from material where id =$1",[material_id])
        return {
            status: 200,
            message: "Material successfully deleted"
        }
    }
}

const materialService = new MaterialService()
export default materialService
