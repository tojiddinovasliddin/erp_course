import fs from "fs";
import lessonServer from "../services/lessons.js";
import path from "path"

class LessonControllers {
    async addNewLesson(req, res, next) {

        try {
            const data = await lessonServer.addLesson(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async updateLesson(req, res, next) {
        try {
            const data = await lessonServer.updateLesson(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allLesson(req, res, next) {
        try {
            const data = await lessonServer.allLesson(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteALesson(req, res, next) {
        try {
            const data = await lessonServer.deleteALesson(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }

}
const lessonControllers = new LessonControllers()
export default lessonControllers
