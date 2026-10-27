import { Pool } from "pg";
import { config } from "dotenv";
config()

const pool = new Pool({
    name: process.env.PG_NAME,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT

})

export default pool
