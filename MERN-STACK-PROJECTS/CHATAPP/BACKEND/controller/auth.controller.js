import User from '../models/user.model.js'
import bcryptjs from "bcryptjs"
export const signup=async (req,res)=>{
    try{
       const {fullname,username,password,confirmpassword,gender}=req.body;
       if(password!==confirmpassword){
        return res.status(400).json({message:"Password and confirm password do not match"})
       }
         const user= await User.findOne({username});
         if(user){
            return res.status(400).json({message:"User already exists"})
         }
        //  hash password here
        const salt =await bcryptjs.genSalt(10);
        // default is number 10
        const hashpassword =await bcryptjs.hash(password,salt)
        // PROFIEL AVATAR
      const boyprofile =`https://avatar.iran.liara.run/public/boy?username=${username}&size=200`
      const girlprofile =`https://avatar.iran.liara.run/public/girl?username=${username}&size=200`
       
      const newuser=new User({
        fullname,
        username,
        password:hashpassword,
        confirmpassword,
    gender,
    profilepic:gender==="male"?boyprofile:girlprofile})
    if(newuser){
        // generate jwt token here
        
    await newuser.save();
    res.status(201).json({
        _id:newuser._id,
        fullname:newuser.fullname,
        username:newuser.username,
        profilepic:newuser.profilepic,
        message:"User registered successfully"
    })
} else {
    res.status(400).json({message:"Error in user registration"})
}
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
  

}
export const logout=(req,res)=>{
    console.log("Logout user")
     res.status(200).json({message:"logout successful"})
}
export const login=(req,res)=>{
    console.log("login user")
     res.status(200).json({message:"login successful"})
}
  














// You don’t want anyone to read it, right?
// So instead of writing the password directly, you convert it into a secret code that nobody can read.

// bcrypt.js creates that secret code.
// If your password is "hello123", bcrypt changes it into something like:

// $2b$10$X3C....aslkdjlkasdjlkasd


// This code cannot be reversed.
// Even hackers can't find the real password.


