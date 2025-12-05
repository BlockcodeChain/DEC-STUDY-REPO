import mongoose from 'mongoose'


const connectdb =async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    }
    catch(err){
        console.log("error in db connection",err)
    }
}
export default connectdb;