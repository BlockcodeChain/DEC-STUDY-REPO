import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
   firstname:{
    type:String,
    required:true
   },
    lastname:{
    type:String,
    required:true
   },
  username:{
    type:String,
    required:true,
    unique:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   
   },
  image:{
    type:String,
    required:false,
    
   }
},{timestampS:true})

const usermodel=mongoose.model("user",userSchema)
export default usermodel;