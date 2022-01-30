import mongoose from "mongoose"
export default ()=>{
    mongoose.connect(process.env.uri).then(()=>{
        console.log('Database Connected')
    }).catch(e=>{
        console.log("Database Error",e)
    })
}