import UserModel from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const signup = async(req, res) => {
    const { body } = req
    const { username, email, password } = body
    const user = await UserModel.findOne({ email })
    if (user) return res.status(400).json({ msg: "User with that email exists" })
    const passcode = await bcrypt.hash(password, 8)
    const token= jwt.sign(email,process.env.secret)
    try {
        const userData = await UserModel.create({...body, passcode })
        return res.status(201).json({ msg: "Account Created Successfully", data: userData,token })
    } catch (error) {
        return res.status(403).json({ msg: `Error ${error}` })
    }
}
export const login = async(req, res) => {
    const { body } = req
    const { email, password } = body
    const user = await UserModel.findOne({ email })
    if (!user) return res.status(404).json({ msg: "No user with that email" })
    const { passcode } = user
    const correctpass = await bcrypt.compare(password, passcode)
    if (!correctpass) return res.status(403).json({ msg: "Incorrect passcode" })
    const token= await jwt.sign(email,process.env.secret)
    return res.status(201).json({ msg: "Logged In Successfully", data: user,token })
}
export const getUser=(req,res)=>{
    return res.status(200).json({msg:res.locals.user})
}

export const logout =(req,res)=>{
    return res.status(200).json({msg:"Logged Out Successfully"})
}