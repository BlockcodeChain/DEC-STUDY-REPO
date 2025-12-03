import express from "express"
import dotenv from "dotenv"
const app=express();
dotenv.config({
    path:"./.env"
})
const Myport=process.env.PORT||3000;
app.get('/',(req,res)=>{
    res.status(200).json({message:"server running"})
   
})
// AUTHENTICATION
// 
// middlewares
app.use('/api/auth',authRoutes)
app.listen(Myport,(req,res)=>{
console.log(`Server running at port ${Myport}`)
})