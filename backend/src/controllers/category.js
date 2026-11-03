import courseCategoryServer from "../services/category.js";

class CategoryControllers{
    async createCategory(req, res, next) {
        try {
            const data = await courseCategoryServer.addCategory(req, next)
            return res.status(data.status).json(data)
        } catch (error) {

            return next(error)
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const data = await courseCategoryServer.deleteCategory(req, next)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }

    }
    async updateCategory(req, res, next) {
        try {
            const data = await courseCategoryServer.UpdateCategory(req)
            return res.status(data.status).json(data)
        } catch (error) {

            return next(error)
        }
    }
    async AllActiceCategory(req, res,next) {
        try {
            const data = await courseCategoryServer.AllActiceCategory(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async AllInacticeCategory(req, res, next) {
        try {
            const data = await courseCategoryServer.AllInacticeCategory(req, next)
            console.log(data)
            return res.status(data.status).json(data)

        } catch (error) {
            return next(error)
        }
    }
    async AllCategory(req, res,next) {
        try {
            const data = await courseCategoryServer.AllCategory(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async changeActive(req, res, next) {
        try {
            const data = await courseCategoryServer.changeActive(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }

}

const categoryControllers = new CategoryControllers()
export default categoryControllers
