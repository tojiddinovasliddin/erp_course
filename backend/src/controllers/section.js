import fs from "fs";
import sectionServer from "../services/section.js";
import path from "path"

class SectionControllers {
    async addNewSection(req, res, next) {
        try {
            const data = await sectionServer.addSection(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async updateSection(req, res, next) {
        try {
            const data = await sectionServer.updateSection(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allSection(req, res, next) {
        try {
            const data = await sectionServer.allSection(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteASection(req, res, next) {
        try {
            const data = await sectionServer.deleteASection(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }

}
const sectionControllers = new SectionControllers()
export default sectionControllers
