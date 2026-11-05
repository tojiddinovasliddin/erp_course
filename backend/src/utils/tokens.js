import { configDotenv } from "dotenv"
import JWT from "jsonwebtoken"
configDotenv()

class Tokens{
    AccessToken(payload) {
        return JWT.sign(payload, process.env.Secret_key, { expiresIn: "30m" })
    }

    RefreshToken(payload) {
        return JWT.sign(payload, process.env.Secret_key, { expiresIn: "1h" })
    }

    VerifyToken(token) {
    return JWT.verify(token, process.env.Secret_key)
    }
}

const tokens = new Tokens()
export default tokens
