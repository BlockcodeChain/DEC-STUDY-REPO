import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";
import connectDB from "./config/db.js";
const app=express();
dotenv.config({
    path:"./.env"
})
const Myport=process.env.PORT||3000;
app.get('/',(req,res)=>{
    res.status(200).json({message:"server running"})
   
})
app.listen(Myport,(req,res)=>{
    connectDB();
console.log(`Server running at port ${Myport}`)
})