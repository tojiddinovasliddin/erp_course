import tokens from "../utils/tokens.js"
import pool from "../config/db.js"
import argon from "argon2"
import ErrorExteption from "../utils/error.js"

class Auth{
    async login(req) {
        const { phone, password } = req.body
        const user = await pool.query("select * from users where phone = $1", [phone])
        if (!user.rows.length || !await argon.verify(user.rows[0].password, password)) {

            throw new Error(404, "The phone number or password is incorrect");
        }


        let create_token = {
            id:user.rows[0].id,
            fullname: user.rows[0].fullname,
            phone: user.rows[0].phone,
            role: user.rows[0].role,
            status:user.rows[0].status
        }
        const accessToken = tokens.AccessToken(create_token)
        const refreshToken = tokens.RefreshToken(create_token)
        return {
            status: 200,
            data: {
                fullname: user.rows[0].fullname,
                phone: user.rows[0].phone,
                role: user.rows[0].role,
                status: user.rows[0].status,
                accessToken: accessToken,
                refreshToken:refreshToken
            }

        }

    }

    async register(req) {
        const { fullname, phone, password } = req.body
        const user = await pool.query("select * from users where phone = $1", [phone])
        if (user.rows.length) {
            throw new Error(409, "The user registered with this phone number");
        }
        await pool.query("insert into users(fullname,phone,password,role) values($1,$2,$3,$4)",[fullname,phone,await argon.hash(password),'student'])
        return {
            status: 201,
            message:"User successfully added"
        }
    }

}

const auth = new Auth()

export default auth
