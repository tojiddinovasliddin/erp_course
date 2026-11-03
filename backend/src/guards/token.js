import tokens from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()

class Token{
    accessToken(payload) {
        return tokens.sign(payload,process.env.Secret_key,{expiresIn: "30m"})
    }
    refreshToken(payload) {
        return tokens.sign(payload,process.env.Secret_key,{expiresIn:"24h"})
    }
}
const token = new Token()
export default token
