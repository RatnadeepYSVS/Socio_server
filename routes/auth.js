import {Router} from "express"
import {signup,login,getUser,logout} from "../controllers/auth.js"
import auth from "../middlewares/auth.js"
const router = Router()
router.post("/login",login)
router.post("/signup",signup)
router.get("/logout",auth,logout)
router.get("/userdet",auth,getUser)
export default router