import fs from "fs"
import taskService from "../services/task.js"
import path from "path"

class TaskControllers {
    async addNewTask(req, res, next) {

        try {
            const data = await taskService.addTask(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async updateTask(req, res, next) {
        try {
            const data = await taskService.updateTask(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allTask(req, res, next) {
        try {
            const data = await taskService.allTask(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteTask(req, res, next) {
        try {
            const data = await taskService.deleteTask(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }

}
const taskControllers = new TaskControllers()
export default taskControllers
