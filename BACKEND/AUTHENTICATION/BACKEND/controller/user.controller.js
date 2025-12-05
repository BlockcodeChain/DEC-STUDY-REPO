
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
export const login=async ()=>{
    //login controller logic
    console.log("login controller")
}
export const logout=async ()=>{
    //login controller logic
    console.log("logout controller")
}
export const signup=async (req,res)=>{
    //login controller logic
    try{
     const {fullname,username,email,password,confirmpassword,gender}=req.body
      if (!fullname||!username||!email||!password||!confirmpassword||!gender)
        return res.status(400).json({message:"All fields are required"})
        if(password!=confirmpassword){
            return res.status(400).json({message:"Password and confirm password do not match"})
        }
      const existuser= await User.findOne({username});
               if(existuser){
                  return res.status(400).json({message:"User already exists"})
               }
            //    passwrod hashing ->bcryptjs
         const salt= await bcryptjs.genSalt(10);
           const hash= await bcryptjs.hash(password,salt)
           const user =new User({
            fullname,username,email,password:hash,gender
           })
           await user.save();
           return res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            gender:user.gender,
            message:"User registered successfully"
           })
    }catch(err){
        return res.status(500).json({message:"Internal server error",error:err.message})
    }
    console.log("signup controller")
}