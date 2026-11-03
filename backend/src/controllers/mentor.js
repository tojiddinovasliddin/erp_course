import fs from "fs";
import mentorService from "../services/mentor.js";
import path from "path"

class MentorControllers{
    async addNewMentor(req, res,next) {

       try {
           const data = await mentorService.addNewMentor(req)
           return res.status(data.status).json(data)
       } catch (error) {
           next(error)

       }
    }
    async deleteMentor(req, res, next) {
        try {
            const data = await mentorService.deleteMentor(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }
    async updateMentor(req, res,next) {
        try {
            const data = await mentorService.updateMentor(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allMentor(req, res,next) {
        try {
            const data = await mentorService.allMentor(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async allMentorActive(req, res,next) {
        try {
            const data = await mentorService.allMentorActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)

        }
    }
    async allMentorInactive(req, res,next) {
        try {
            const data = await mentorService.allMentorInactive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async changeToActive(req, res, next) {
        try {
            const data = await mentorService.changeActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }

}
const mentorControllers = new MentorControllers()
export default mentorControllers
