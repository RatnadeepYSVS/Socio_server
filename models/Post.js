import mongoose from "mongoose"
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    likes:{
        type:Number
    },
    dislikes:{
        type:Number
    }
})
export default mongoose.model("Post",postSchema)