import express from 'express'
import dotenv from 'dotenv'
import connectdb from './utils/db.js';
const app=express();
dotenv.config({
    path:"./.env",
})
const myport =process.env.PORT ||3000;
app.get('/',(req,res)=>{
    res.send("hello from express")
})
app.listen(myport,(req,res)=>{
    connectdb();
    console.log(`Server running at ${myport}`)
})