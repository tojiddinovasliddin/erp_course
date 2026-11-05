import authService from "../services/auth.js";

class Auth{
    async login(req, res,next) {
        try {
            const data = await authService.login(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }
    async register(req, res, next) {
        try {
            const data = await authService.register(req)
            return res.status(data.status).json(data)
        } catch (error) {
            return next(error)
        }
    }

}

const auth = new Auth()
export default auth
