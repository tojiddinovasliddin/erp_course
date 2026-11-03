import token from "../guards/token.js"
import tok from "jsonwebtoken"
import pool from "../config/db.js"
import argon from "argon2"

class Auth{
    async login(req) {
        const { phone, password } = req.body
        const user =await pool.query("select * from users where phone = $1", [phone])
        // if (!user.rows.length || !await argon.verify(user.rows[0].password, password)) {
        //     return {
        //         status: 404,
        //         message: "The phone number or password is incorrect"
        //     }
        // }

        let create_token = {
            fullname: user.rows[0].fullname,
            phone: user.rows[0].phone,
            password: password,
            role: user.rows[0].role,
            status:user.rows[0].status
        }
        const accessToken = token.accessToken(create_token)
        const refreshToken = token.refreshToken(create_token)
        return {
            status: 200,
            data: {
                fullname: user.rows[0].fullname,
                phone: user.rows[0].phone,
                password: password,
                role: user.rows[0].role,
                status: user.rows[0].status,
                accessToken: accessToken,
                refreshToken:refreshToken
            }

        }

    }

}

const auth = new Auth()

export default auth
