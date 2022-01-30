import Post from "../models/Post.js";
import User from "../models/User.js";
export const getAllPosts=async(req,res)=>{
    const posts = await Post.find()
    try {
        res.status(200).json({msg:posts})   
    } catch (error) {
        console.log(error)
    }
}
export const getPost =async(req,res)=>{
    const id = req.params.id
    if(!id)return res.status(404).json({msg:"Url Not Found"})
    const post = await Post.findById(id)
    const { user } = post
    const { username } = await User.findById(user)
    res.status(200).json({ username,post })
}
export const createpost=async(req,res)=>{
    const { _id }=res.locals.user
    if(!_id)return res.status(403).json({msg:"Invalid User"})
    const { body }=req

    try{   
         const postData= await Post.create({ ...body,user:_id,likes:0,dislikes:0 })
         return res.status(201).json({msg:"Post Created",data:postData})
    }catch(err){
        console.log(err)
    }
}
export const addLike=async(req,res)=>{
    const { _id } =res.locals.user
    if(!_id)return res.status(403).json({msg:"Invalid User"})
    const id=req.params.id
    if(!id)return res.status(404).json({msg:"Url Not Found"})
    const PostData= await Post.findByIdAndUpdate(id,{$inc:{likes:1}},{new:true,runValidators:true})
    return res.status(201).json({msg:"You Liked A post",data:PostData})
}

export const addDisLike=async(req,res)=>{
    const { _id } =res.locals.user
    if(!_id)return res.status(403).json({msg:"Invalid User"})
    const id=req.params.id
    if(!id)return res.status(404).json({msg:"Url Not Found"})
    const PostData= await Post.findByIdAndUpdate(id,{$inc:{dislikes:1}},{new:true,runValidators:true})
    return res.status(201).json({msg:"You DisLiked A post",data:PostData})
}

export const updatePost=async(req,res)=>{
    const id = req.params.id
    const {_id}=res.locals.user
    if(!_id)return res.status(403).json({msg:"Invalid User"})
    const {body}=req
    if(!id)return res.status(404).json({msg:"Url Not Found"})
    const postData =await Post.findByIdAndUpdate(id,{...body},{new:true,runValidators:true})
    return res.status(201).json({msg:"Post data updated"})
}
export const deletePost=async(req,res)=>{
    const id = req.params.id
    const {_id}=res.locals.user
    if(!_id)return res.status(403).json({msg:"Invalid User"})
    if(!id)return res.status(404).json({msg:"Url Not Found"})
    const postData =await Post.findByIdAndDelete(id)
    return res.status(201).json({msg:"Post data deleted"})
}