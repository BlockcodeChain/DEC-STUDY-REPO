import mongoose  from 'mongoose'

const userschema=new mongoose.Schema({
    fullname:{
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
      required:true,
      minlength:6
    },
    //  confirmpassword:{
    //   type:String,
    //   required:true
     
    // },
     gender:{
      type:String,
      required:true,
      enum:["male","female","other"]
    }
},{ timestamps: true })

const usermodel=mongoose.model("User",userschema);
export default usermodel;