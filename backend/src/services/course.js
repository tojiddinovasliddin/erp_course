import pool from "../config/db.js"

class CourseService{
        createCourse(req) {
                const{banner,intro_video,name,info,degree,price,teacher_id,category_id} = req.body
        }
        getAllCourse(req) {
                let allCourse = pool.query()
        }

}
const courseService = new CourseService()
export default courseService
