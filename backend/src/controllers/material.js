import fs from "fs"
import materialService from "../services/material.js"
import path from "path"

class MaterialControllers {
    async addNewMaterial(req, res, next) {

        try {
            const data = await materialService.addMaterial(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async updateMaterial(req, res, next) {
        try {
            const data = await materialService.updateMaterial(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allMaterial(req, res, next) {
        try {
            const data = await materialService.allMaterial(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteMaterial(req, res, next) {
        try {
            const data = await materialService.deleteMaterial(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }

}
const materialControllers = new MaterialControllers()
export default materialControllers
