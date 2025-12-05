import mongoose from 'mongoose'
const userschema =new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
     username:{
        type:String,
        require:true,
        unique:true
    },
     password:{
        type:String,
        require:true,
       minlength:6
    },
     confirmpassword:{
        type:String,
        require:true,
        minlength:6
    },
    age:{
        type:String,
        require:true,
        enum:["male","female","other"]
        // enum for certain values
    },
    profilepic:{
        type:String,
        default:"",
        required:false
    }
})

const Usermodel=mongoose.model("User",userschema)
export default Usermodel;