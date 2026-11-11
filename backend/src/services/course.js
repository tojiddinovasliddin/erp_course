import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import path from "path"

class CourseServer {
        async AddCourse(req) {
                const { banner, intro_video } = req.files || {}
                const { name, description, level, price, category_id, mentor_id } = req.body
                const check_mentor = await pool.query("select * from users where role = $1 and id = $2 and status = $3", ['mentor',mentor_id,'active'])
                if (!check_mentor.rows.length) {
                        throw new ErrorExteption(409, "You are not mentor")
                }
                if (!banner) {
                        throw new ErrorExteption(404, "You must upload banner")
                }
                if (!intro_video) {
                        throw new ErrorExteption(404,"You must upload intro_video")
                }
                const check_category = await pool.query("select * from category where id = $1", [category_id])
                if (!check_category.rows.length) {
                        throw new ErrorExteption(404,"Category not found")
                }

                const check_banner = ["png", "jpg", "webp", "svg", "gif", "avif", "ico"]
                const check_video = ["mp4", "mpeg", "mov", "avi", "mkv", "webm", "ogv", "3gp", "wmv", "flv"]

                const banners = banner.name.split(".").at(-1)
                const video = intro_video.name.split(".").at(-1)
                if (!check_banner.includes(banners) || !check_video.includes(video)) {
                        throw new ErrorExteption(415, "Unsupported Media Type");
                }
                banner.mv(path.join(process.cwd(), "src", "uploads", "course", "banner", `${new Date().getTime() + '.' + banners}`), (error) => console.log(error))
                intro_video.mv(path.join(process.cwd(), "src", "uploads", "course", "video", `${new Date().getTime() + '.' + video}`), (error) => console.log(error))
                await pool.query("insert into course(banner,intro_video,name,description,level,price,category_id,mentor_id,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9)", [`${new Date().getTime() + path.extname(banner.name)}`,
                `${new Date().getTime() + path.extname(intro_video.name)}`, name, description, level, price, category_id,mentor_id,'active'])
                return {
                        status: 201,
                        message: "Course successfully added"
                }

        }
        async DeleteCourse(req) {
                const { course_id } = req.params
                let check_course = await pool.query("select * from course where id = $1 and status = $2", [course_id, 'active'])
                if (!check_course.rows.length) {
                        throw new ErrorExteption(404, "Course not found")
                }
                await pool.query("update course set status =$1 where id = $2", ['inactive', course_id])
                return {
                        status: 200,
                        message: "Course successfully deleted"
                }
        }
        async AllActiceCourse(req) {
                const all_course = await pool.query("select * from course where status = $1", ['active'])
                return {
                        status: 200,
                        data: all_course.rows
                }
        }
        async AllInacticeCourse(req) {
                const all_course = await pool.query("select * from course where status = $1", ['inactive'])
                return {
                        status: 200,
                        data: all_course.rows
                }
        }
        async AllCourse(req) {
                const all_course = await pool.query("select * from course inner join category on course.category_id = category.id")
                return {
                        status: 200,
                        data: all_course.rows
                }
        }
        async UpdateCourse(req) {
                const { course_id } = req.params
                const { banner, intro_video } = req.files || {}
                const { name, description, level, price, category_id } = req.body ||{}
                const check_course = await pool.query("select * from course where id = $1", [course_id])
                if (!check_course.rows.length) {
                        throw new ErrorExteption(400, "Category not found");
                }
                const check_banner = ["png", "jpg", "webp", "svg", "gif", "avif", "ico"]
                const check_video = ["mp4", "mpeg", "mov", "avi", "mkv", "webm", "ogv", "3gp", "wmv", "flv"]
                if (banner) {
                        const banners = banner.name.split(".").at(-1)
                        if (!check_banner.includes(banners)){
                                throw new ErrorExteption(415, "Unsupported media type")
                        }
                        else {
                                await pool.query("update course set banner = $1 where id = $2", [new Date().getTime() + banner.name.split(".")[1], course_id])
                                banner.mv(path.join(process.cwd(), "src", "uploads", "course", "banner", `${new Date().getTime() + path.extname(banner.name)}`), (error) => console.log(error))
                        }
                }
                if (intro_video) {
                        const video = intro_video.name.split(".").at(-1)
                        if (!check_video.includes(video)){
                                throw new ErrorExteption(415, "Unsupported media type")
                        }
                        else {
                                await pool.query("update course set intro_video = $1 where id = $2", [new Date().getTime() + intro_video.name.split(".")[1], course_id])
                                banner.mv(path.join(process.cwd(), "src", "uploads", "course", "video", `${new Date().getTime() + path.extname(intro_video.name)}`), (error) => console.log(error))
                        }
                }
                if (name) {
                        await pool.query("update course set name = $1 where id = $2", [name, course_id])
                }
                if (description) {
                        await pool.query("update course set description = $1 where id = $2", [description, course_id])
                }
                if (level) {
                        await pool.query("update course set level = $1 where id = $2", [level, course_id])
                }
                if (price) {
                        await pool.query("update course set price = $1 where id = $2", [price, course_id])
                }
                if (category_id) {
                        await pool.query("update course set category_id = $1 where id = $2", [category_id, course_id])
                }

                return {
                        status: 201,
                        message: "Update successfully"
                }

        }
        async ChangeActive(req) {

                const { course_id } = req.params
                const check_course = await pool.query("select * from course where id = $1 and status !=$2", [course_id, 'active'])
                if (!check_course.rows.length) {
                        throw new ErrorExteption(400, "Course not found")
                }
                await pool.query("update course set status = $1 where id = $2", ['active', course_id])
                return {
                        status: 201,
                        message: "Update successfully"
                }
        }
        async ShowACourse(req) {
                const { course_id } = req.params
                const course = await pool.query("select course.banner,course.intro_video,category.name as category_name,course.level,course.price,course.name as course_name, course.student_cnt,course.status,course.create_at,mentor.fullname as mentor_name,assistant.fullname as assistant_name from course inner join category on course.category_id = category.id inner join users as mentor on mentor.id = course.mentor_id left join users as assistant on assistant.id = course.assistant_id  where course.id  = $1",[course_id])
                return {
                        status: 200,
                        data: course.rows
                }
        }
        async AddAssistant(req) {
                const { course_id } = req.params
                const { assistant_id } = req.body
                const check_course = await pool.query("select * from course where id = $1", [course_id])
                if (!check_course.rows.length) {
                        throw new ErrorExteption(400, "Before adding a assistant, you add course")
                }
                const check_assistant = await pool.query("select * from course where assistant_id =$1 and id = $2", [assistant_id,course_id])
                if (check_assistant.rows.length) {
                        throw new ErrorExteption(409,"In this course, has a assistant")
                }
                const check_ass = await pool.query("select * from users where id = $1", [assistant_id])
                if (!check_ass.rows.length) {

                        throw new ErrorExteption(404,"Assistant not found")
                }
                const check_assis = await pool.query("select * from users where role = $1 and status = $2", ['assistant','active'])
                if (!check_assis.rows.length) {
                        throw new ErrorExteption(409, "The role of users is not an assistant")
                }
                await pool.query("update course set assistant_id = $1 where id = $2", [assistant_id, course_id])
                return {
                        status: 201,
                        message:"Assistant successfully added to this course"
                }
        }
        async DeleteAssistant(req) {
                const { course_id } = req.params
                const check_course = await pool.query("select * from course where id = $1", [course_id])
                if (!check_course.rows.length) {
                        throw new ErrorExteption(400, "Before deleting a assistant, you add course")
                }
                const check_assistant = await pool.query("select * from course where assistant_id > $1 and id = $2", [1, course_id])
                if (!check_assistant.rows.length) {
                        throw new ErrorExteption(409, "In this course, has not a assistant")
                }
                await pool.query("update course set assistant_id = null where id = $1", [course_id])

                return {
                        status: 201,
                        message: "Assistant successfully deleted to this course"
                }
        }
        async showAllCourseACategory(req) {
                const { category_id } = req.params
                const check_category = await pool.query("select course.banner,course.id as course_id,course.name as course_name,course.intro_video,course.description,course.price,users.fullname as teacher_name from course inner join users on users.id = course.mentor_id where course.category_id = $1", [category_id])
                if (!check_category.rows.length) {
                        throw new ErrorExteption(404, "Category Not found");
                }
                return {
                        status: 200,
                        data: check_category.rows
                }

        }


}

const courseServer = new CourseServer()
export default courseServer


