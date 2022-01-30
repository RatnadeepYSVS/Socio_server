import express from "express"
import { config } from "dotenv"
import db_connect from "./db_connect.js"
import cors from "cors"
import auth_router from "./routes/auth.js"
import post_router from "./routes/post.js"
config()
db_connect()
const app=express()
const port = process.env.PORT||5000
app.use(express.json())
app.use(cors({
    credentials:true,
    optionsSuccessStatus:200
}))
app.use(express.urlencoded({extended:false}))
app.use(auth_router)
app.use(post_router)
app.listen(port,()=>console.log(`Server running at ${port}`))
