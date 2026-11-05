import AuthControllers from "../controllers/auth.js";
import { Router } from "express";
import valudation from "../middleware/valudation.js";

const auth = Router()
auth
    .post("/auth/login", AuthControllers.login)
    .post("/register/student",valudation.checkStudent,AuthControllers.register)

export default auth
