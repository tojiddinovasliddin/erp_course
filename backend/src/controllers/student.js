import fs from "fs";
import studentService from "../services/student.js";
import path from "path"

class StudentControllers {
    async addNewStudent(req, res, next) {
        try {
            const data = await studentService.addNewStudent(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async studentToconnectCoure(req, res, next) {
        try {
            const data = await studentService.connectCourseToStudet(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async showAStudent(req, res, next) {
        try {
            const data = await studentService.showAStudent(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteAStudentFromCourse(req, res, next) {
        try {
            const data = await studentService.deleteAStudentFromCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteStudent(req, res, next) {
        try {
            const data = await studentService.deleteStudent(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async showAllStudentCourse(req, res, next) {
        try {
            const data = await studentService.showAllStudentCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async showAllActiveStudentCourse(req, res, next) {
        try {
            const data = await studentService.showAllActiveStudentCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async showAllInActiveStudentCourse(req, res, next) {
        try {
            const data = await studentService.showAllInactiveStudentCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async uptadeStudent(req, res, next) {
        try {
            const data = await studentService.updateStudent(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }

    async changeToActive(req, res, next) {
        try {
            const data = await studentService.changeActiveStudent(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }

}
const studentControllers = new StudentControllers()
export default studentControllers
