import pool from "../config/db.js"
import ErrorExteption from "../utils/error.js"
import path from "path"

class ExamService {
    async addExam(req) {
        const { lesson_id } = req.params
        const { question,option_a, option_b, option_c, option_d,answer } = req.body
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"lesson not found")
        }

        const check_mentor = await pool.query("select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id where users.role = $1 and lesson.id = $2", ['mentor',lesson_id])

        if (req.user.role !='admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409,"You can not add exam to this lesson")
        }

        await pool.query("insert into exam(lesson_id,question, option_a,option_b,option_c,option_d,answer) values($1, $2, $3,$4,$5,$6,$7)",[lesson_id,question,option_a,option_b,option_c,option_d,answer])

        return {
            status: 201,
            message:"Exam successfully added"
        }

    }
    async updateExam(req) {
        const { exam_id } = req.params
        const { question, option_a, option_b, option_c, option_d, answer } = req.body

        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from exam where id = $1", [exam_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404, " Exam not found")
        }
        const check_mentor = await pool.query(" select users.id from users inner join course on users.id = course.mentor_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join exam on exam.lesson_id = lesson.id where exam.id =$1 and users.role = $2", [exam_id,'mentor'])
        console.log(check_mentor.rows)
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not update exam to this lesson")
        }


        if (question) {
            await pool.query("update exam set question = $1 where id = $2", [question, exam_id])
        }
        if (option_a) {
            await pool.query("update exam set option_a = $1 where id = $2", [option_a, exam_id])
        }
        if (option_b) {
            await pool.query("update exam set option_b = $1 where id = $2", [option_b, exam_id])
        }
        if (option_c) {
            await pool.query("update exam set option_c = $1 where id = $2", [option_c, exam_id])
        }
        if (option_d) {
            await pool.query("update exam set option_d = $1 where id = $2", [option_d, exam_id])
        }
        if (answer) {
            await pool.query("update exam set answer = $1 where id = $2", [answer, exam_id])
        }

        return {
            status: 201,
            message:"Lessons update successfully"
        }
    }
    async allExam(req) {
        const { lesson_id } = req.params
        const mentor_id = req.user.id
        const check_lesson = await pool.query("select * from exam where lesson_id = $1", [lesson_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"Before seeing exam, you add lesson")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join material on material.lesson_id = lesson.id where users.role = $1 and lesson.id = $2",['mentor',lesson_id])
        const check_student = await pool.query("select student_course.student_id from course inner join section on section.course_id = course.id inner join student_course on student_course.course_id = course.id inner join lesson on lesson.section_id = section.id inner join exam on exam.lesson_id  = lesson.id where exam.lesson_id = $1",[lesson_id] )

        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id && check_student.rows[0].student_id!= mentor_id) {
            throw new ErrorExteption(409, "You can not see exam of this lesson")
        }
        const allACourseLesson = await pool.query("select * from exam where lesson_id  = $1", [lesson_id])
        return {
            status: 200,
            data: allACourseLesson.rows
        }

    }
    async deleteExam(req) {
        const { exam_id } = req.params
        const mentor_id = req.user.id
        const check_exam = await pool.query("select * from exam where id = $1", [exam_id])
        if (!check_exam.rows.length) {
            throw new ErrorExteption(404, "Exam not found")
        }
        const check_mentor = await pool.query("select users.id from users inner join course on course.mentor_id  = users.id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id inner join exam on exam.lesson_id = lesson.id  where users.role = $1 and exam.id = $2", ['mentor', exam_id])
        if (req.user.role != 'admin' && check_mentor.rows[0].id != mentor_id) {
            throw new ErrorExteption(409, "You can not delete exam")
        }
        await pool.query("delete from exam where id =$1",[exam_id])
        return {
            status: 200,
            message: "Exam successfully deleted"
        }
    }
    async addAnswerToExam(req) {
        const { lesson_id } = req.params
        const { exam_id, student_id, answer } = req.body

        const check_lesson = await pool.query("select * from lesson where id = $1", [lesson_id])
        const check_exam = await pool.query("select * from exam where id = $1",[exam_id])
        if (!check_lesson.rows.length) {
            throw new ErrorExteption(404,"Lesson not found")
        }
        if (!check_exam.rows.length) {
            throw new ErrorExteption(404, "Exam not found")
        }
        const check_student = await pool.query("select student_course.student_id from student_course inner join course on course.id = student_course.course_id inner join section on section.course_id = course.id inner join lesson on lesson.section_id = section.id where student_course.student_id = $1 and lesson.id = $2", [student_id, lesson_id])

        if (!check_student.rows.length) {
            throw new ErrorExteption(404,"Student not connect to this course")
        }
        const check_answer = await pool.query("select * from exam where id = $1 and answer = $2", [exam_id, answer])
        if (!check_answer.rows.length) {
            throw new ErrorExteption(404,"THis option has not in this exam")
        }
        const check_exam2 = await pool.query("select * from answer where exam_id = $1", [exam_id])
        if (check_exam2.rows.length) {
            throw new ErrorExteption(409,"You could answer to this question before")
        }

        await pool.query("insert into answer(lesson_id,exam_id,student_id,answer) values($1,$2,$3,$4)", [lesson_id, exam_id, student_id, answer])
        return {
            status: 201,
            message:"Save the answer exam"
        }
    }
    
}

const examService = new ExamService()
export default examService
