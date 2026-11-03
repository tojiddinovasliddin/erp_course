import authService from "../services/auth.js";

class Auth{
    async login(req, res) {
        try {
            const data = await authService.login(req)
            return res.status(data.status).json(data)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({
                status: 400,
                message: "Mistake on backend"
            })
        }
    }

}

const auth = new Auth()
export default auth
