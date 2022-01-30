import { Router } from "express";
import { addDisLike, addLike, createpost,deletePost,getAllPosts,getPost, updatePost } from "../controllers/post.js";
import auth from "../middlewares/auth.js";
const router = Router()
router.get("/allposts",auth,getAllPosts)
router.get("/getpost/:id",auth,getPost)
router.post("/createpost",auth,createpost)
router.put("/addlike/:id",auth,addLike)
router.put("/adddislike/:id",auth,addDisLike)
router.put("/updatepost/:id",auth,updatePost)
router.delete("/deletepost/:id",auth,deletePost)
export default router