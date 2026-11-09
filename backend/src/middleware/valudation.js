import Joi from "joi";
import errorExteption from "../utils/error.js";

const checkAdmin = (req, res, next) => {
    const adminCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
        password: Joi.string().min(8).max(20).required(),

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
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
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
const checkStudent = (req, res, next) => {
    const studentCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
        password: Joi.string().min(8).max(20).required(),
    })
    const { error } = studentCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkCourse = (req, res, next) => {
    const courseCheck = Joi.object({
        banner: Joi.string().optional(),
        intro_video: Joi.string().optional(),
        name: Joi.string().min(5).max(20).required(),
        description: Joi.string().min(5).required(),
        level: Joi.string().min(5).max(20).required(),
        price: Joi.number().positive().required(),
        category_id: Joi.number().integer().positive().required(),
        mentor_id: Joi.number().integer().positive().required(),
    })
    const { error } = courseCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkAssistant = (req, res, next) => {
    const assistantCheck = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).required(),
        password: Joi.string().min(8).max(20).required(),
        course_id: Joi.number().positive().required()
    })
    const { error } = assistantCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkSection = (req, res, next) => {
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
const checkLesson = (req, res, next) => {
    const lessonCheck = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).required(),
        video:Joi.string().optional()
    })
    const { error } = lessonCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkMaterial = (req, res, next) => {
    const materialCheck = Joi.object({
        description: Joi.string().min(3).required(),
        file: Joi.string().optional()
    })
    const { error } = materialCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkTask = (req, res, next) => {
    const TaskCheck = Joi.object({
        task: Joi.string().min(3).required(),
        file: Joi.string().optional()
    })
    const { error } = TaskCheck.validate(req.body);
    if (error) {
        return next(new errorExteption(400, error.message))
    }
    else {
        next()
    }
}
const checkExam = (req, res, next) => {
    const ExamCheck = Joi.object({
        lesson_id: Joi.number().integer().positive().required(),
        option_a: Joi.string().min(1).max(1).required(),
        option_b: Joi.string().min(1).max(1).required(),
        option_c: Joi.string().min(1).max(1).required(),
        option_b: Joi.string().min(1).max(1).required(),
    })
    const { error } = ExamCheck.validate(req.body);
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
    checkStudent,
    checkCategory,
    checkCourse,
    checkAssistant,
    checkSection,
    checkLesson,
    checkMaterial,
    checkTask,
    checkExam
}
