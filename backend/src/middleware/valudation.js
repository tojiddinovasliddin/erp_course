import Joi from "joi";
import errorExteption from "../utils/error.js";

const checkAdmin = (req, res, next) => {
    const adminCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
        password: Joi.string().min(8).max(20).required(),
        role: Joi.string().lowercase().required()
    })
    const { error } = adminCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400,error.message))
    }
    else {
        next()
    }
}

const checkMentor = (req, res, next) => {
    const mentorCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
        password: Joi.string().min(8).max(20).required(),
        photo:Joi.string().optional(),
        experience: Joi.number().optional(),
        job: Joi.string().min(3).optional(),
        website: Joi.string().uri().optional(),
        info: Joi.string().max(100).optional(),
        facebook: Joi.string().uri().optional(),
        telegram: Joi.string().uri().optional(),
        instagram: Joi.string().uri().optional(),
        linkedin: Joi.string().uri().optional(),
        github: Joi.string().uri().optional(),
        role: Joi.string().lowercase().required()
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
const checkCategory = (req, res, next) => {
    const adminCheck = Joi.object({
        name: Joi.string().min(6).max(30).required()
    })
    const { error } = adminCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}


export default {
    checkAdmin,
    checkMentor,
    checkCategory
}
