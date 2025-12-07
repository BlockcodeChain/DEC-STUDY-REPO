import express from 'express'
import dotenv from 'dotenv'
import authrouter from './routes/user.route.js'
import connectdb from './config/db.js';
const app=express();

dotenv.config({
    path:"./.env"
})
app.use(express.json())
app.use('/api/auth/',authrouter)
const myport=process.env.PORT ||3000;

app.listen(myport,()=>{
    connectdb();
    console.log(`SERVER IS RUNNING AT PORT ${myport}`);
})