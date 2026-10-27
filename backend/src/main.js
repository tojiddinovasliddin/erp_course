import express from "express"
import main_router from "./routers/router.js"
import { config } from "dotenv"
config()


const app = express()
app.use(express.json())
app.use(main_router)


app.listen(process.env.PORT, console.log(`${process.env.PORT} port  is running`))
