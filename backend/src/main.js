import express from "express"
import fileUpload from "express-fileupload"
import main_router from "./routers/router.js"
import { config } from "dotenv"
config()
import path from "path"
import fs from "fs"

const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(main_router)

app.use((error, req, res, next) => {
    if (error.status < 500){
        return res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }
    else {
        console.log(error.message)
        fs.appendFileSync(path.join(process.cwd(),"src","log","logger.txt"),`\r\n[${new Date().toLocaleString()}] - ${req.method} - ${req.url} - ${error.message}`)
        return res.status(500).json({
            status: 500,
            message:"Mistake on backend"
        })

    }
})

app.listen(process.env.PORT, () => { console.log(`${process.env.PORT} port is running`);});

