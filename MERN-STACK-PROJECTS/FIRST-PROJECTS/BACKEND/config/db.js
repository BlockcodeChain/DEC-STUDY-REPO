import mongoose from 'mongoose'
const connectdb =async()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URL)
     console.log("Mongodb connected successfully")
    }
    catch(err){
        console.log(`Error:${err.message}`);
    }
}
export default connectdb;