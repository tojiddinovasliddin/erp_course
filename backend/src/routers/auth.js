import AuthControllers from "../controllers/auth.js";
import { Router } from "express";

const auth = Router()
auth
    .post("/auth/login",AuthControllers.login)

export default auth
