import mongoose from 'mongoose'

const connectDB=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    }
    catch(err){
        console.log(`MONGODB CONNECTION ERROR:${err.message}`);
        res.status(500).json({sucess:false,message:"MONGODB CONNECTION ERROR"})
    }
}
export default connectDB