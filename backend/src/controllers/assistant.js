import fs from "fs";
import assistantService from "../services/assistant.js";
import path from "path"

class AssistantControllers{
    async addNewAssistant(req, res,next) {

       try {
           const data = await assistantService.addNewAssistant(req)
           return res.status(data.status).json(data)
       } catch (error) {
           next(error)

       }
    }
    async deleteAssistant(req, res, next) {
        try {
            const data = await assistantService.deleteAssistant(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }
    async updateAsistant(req, res,next) {
        try {
            const data = await assistantService.updateAsistant(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allAssistant(req, res,next) {
        try {
            const data = await assistantService.allAssistant(req,next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allAssistantActive(req, res,next) {
        try {
            const data = await assistantService.allAssistantActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async allAssistantInactive(req, res,next) {
        try {
            const data = await assistantService.allAssistantInactive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async changeToActive(req, res, next) {
        try {
            const data = await assistantService.changeActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async showA_assistant(req, res, next) {
        try {
            const data = await assistantService.showA_assistant(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
}
const assistantControllers = new AssistantControllers()
export default assistantControllers
