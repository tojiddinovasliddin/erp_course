import Joi from "joi";
import errorExteption from "../utils/error.js";

const checkUpdateAdmin = (req, res, next) => {
    const adminCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).optional(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).optional(),
        password: Joi.string().min(8).max(20).optional(),
    })
    const { error } = adminCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkUpdateMentor = (req, res, next) => {
    const mentorCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).optional(),
        phone: Joi.string().pattern(/^998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).optional(),
        password: Joi.string().min(8).max(20).optional(),
        photo: Joi.string().optional(),
        experience: Joi.number().optional(),
        job: Joi.string().min(3).optional(),
        website: Joi.string().uri().optional(),
        info: Joi.string().max(100).optional(),
        facebook: Joi.string().uri().optional(),
        telegram: Joi.string().uri().optional(),
        instagram: Joi.string().uri().optional(),
        linkedin: Joi.string().uri().optional(),
        github: Joi.string().uri().optional()
    })
    const { error } = mentorCheck.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
    else {
        next()
    }
}
const checkUpdateCategory = (req, res, next) => {
    const categoryCheck = Joi.object({
        name: Joi.string().min(6).max(30).required()
    })
    const { error } = categoryCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkUpdateCourse = (req, res, next) => {
    const courseCheck = Joi.object({
        banner: Joi.string().optional(),
        intro_video: Joi.string().optional(),
        name: Joi.string().min(5).max(20).optional(),
        description: Joi.string().min(5).optional(),
        level: Joi.string().min(5).max(20).optional(),
        price: Joi.number().positive().optional(),
        category_id: Joi.number().integer().positive().optional(),
    })
    const { error } = courseCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkUpdateAssistant = (req, res, next) => {
    const assistantCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).optional(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).optional(),
        password: Joi.string().min(8).max(20).optional(),
        course_id: Joi.number().positive().optional(),
        photo: Joi.string().optional()
    })
    const { error } = assistantCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkUpdateStudent = (req, res, next) => {
    const studentCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).optional(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).optional(),
        password: Joi.string().min(8).max(20).optional(),
        photo:Joi.string().optional()
    })
    const { error } = studentCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
export default {
    checkUpdateAdmin,
    checkUpdateMentor,
    checkUpdateCategory,
    checkUpdateCourse,
    checkUpdateAssistant,
    checkUpdateStudent

}
