import mongoose from 'mongoose'
import dotenv from 'dotenv'
const connectDB=async ()=>{
    try{
        cosole.log("DB CONNECTED")
        await mongoose.connect(process.env.MONGODB_URL)
    }
     catch(err){
        console.log("Error in DB connection",err)
     }
}
export default connectDB;