import courseService from "../services/course.js";

class CourseController{
    async createCourse(req, res, next) {
        try {
            const data = await courseService.AddCourse(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async deleteCourse(req, res, next) {
        try {
            const data = await courseService.DeleteCourse(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }
    async updateCourse(req, res, next) {
        try {
            const data = await courseService.UpdateCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {

            return next(error)
        }
    }
    async allCourseActive(req, res) {
        try {
            const data = await courseService.AllActiceCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async allCourseInactive(req, res, next) {
        try {
            const data = await courseService.AllInacticeCourse(req, next)
            console.log(data)
            return res.status(data.status).json(data)

        } catch (error) {
            return next(error)
        }
    }
    async allCourse(req, res) {
        try {
            const data = await courseService.AllCourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async changeToActive(req, res, next) {
        try {
            const data = await courseService.ChangeActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async showAcourse(req, res, next) {
        try {
            const data = await courseService.ShowACourse(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async addAssistent(req, res, next) {
        try {
            const data = await courseService.AddAssistant(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async deleteAssistent(req, res, next) {
        try {
            const data = await courseService.DeleteAssistant(req)
            return res.status(data.status).json(data)
        } catch (error) {
            next(error)
        }
    }
    async showAllCourseACategory(req, res, next) {
        try {
            const data = await courseService.showAllCourseACategory(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }

}

const courseController = new CourseController()

export default courseController
