import express from 'express';
import dotenv from'dotenv';
import authrouter from './router/user.router.js'
import connectDB from './config/db.js';
const app=express();
dotenv.config({
    path:"./.env",
})

app.use(express.json());
app.use('/api/auth',authrouter)
const myport=process.env.PORT||3000
// app.get("/",(req,res)=>{
//     res.send("hello")
// })
app.listen(myport,(req,res)=>{
    connectDB();
    console.log(`Server running at port ${myport}`)
})