import token from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()
class CheckToken {
    Admin(req, res, next) {
        const { tokens } = req.headers
        if (!tokens) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            })
        }
        const check = token.verify(tokens, process.env.Secret_key)
        if (check.role == 'admin') {
            next()
        }
        else {
            return json({
                status: 403,
                message: 'Forbidden'
            })
        }
    }
}

const checkToken = new CheckToken()
export default checkToken

