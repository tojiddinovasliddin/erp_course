import fs from "fs"
import examService from "../services/exam.js"
import path from "path"

class ExamControllers {
    async addNewExam(req, res, next) {

        try {
            const data = await examService.addExam(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async updateExam(req, res, next) {
        try {
            const data = await examService.updateExam(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allExam(req, res, next) {
        try {
            const data = await examService.allExam(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteExam(req, res, next) {
        try {
            const data = await examService.deleteExam(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }

}
const examControllers = new ExamControllers
export default examControllers
