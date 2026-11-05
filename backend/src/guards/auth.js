import ErrorException from "../utils/error.js"
import tokens from "../utils/tokens.js"

export const authGuard = (req, res, next) => {
    try {
        let { token } = req.headers
        if (!token) {
            return next(new ErrorException(401, "Token is required!"))
        }

        let user = tokens.VerifyToken(token)
        req.user = user
        return next()
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            return next(new ErrorException(401, error.message))
        }
        if (error.name == "TokenExpiredError") {
            return next(new ErrorException(401, error.message))
        }
        return next(new ErrorException(500, "Internal server error!"))
    }
}
