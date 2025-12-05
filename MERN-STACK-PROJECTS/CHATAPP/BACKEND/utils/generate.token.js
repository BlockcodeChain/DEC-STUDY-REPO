import jwt from "jsonwebtoken"
const generatetoken= (userid,res)=>{
    const token =jwt.sign({userid},process.env.JWT_SECRET,{
  expiresIn:"15d"
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*100, //millisecodn
        httponly:true,
       samsites:"strict"

    })
}
