import express from "express"
import dotenv from "dotenv"
import authRoutes from './Routes/auth.route.js'
import connectDB from "./config/db.js";
const app=express();
dotenv.config({
    path:"./.env"
})
// to parse the incomin requests with json playloads (from req.body)
app.use(express.json())
// middlewares
app.use('/api/auth',authRoutes)
const Myport=process.env.PORT||3000;

// app.get('/',(req,res)=>{
//     res.status(200).json({message:"server running"})
   
// })
// AUTHENTICATION
// 

app.listen(Myport,(req,res)=>{
    connectDB();
console.log(`Server running at port ${Myport}`)
})