// global import 

import express from 'express';
import dotenv from 'dotenv'
import session from 'express-session';

// local import
import authRoute from './routes/auth.routes.js'
const app=express();
dotenv.config({
    path:"./.env"
})
const myport=process.env.PORT||5000;
// global midddleware
app.use(express.json())

// route
app.get('/',(req,res)=>{
   
    // session
    app.use(session({
        secret:"mysecret",
        resave:false,
        saveUninitialized:false,
        cookie:{
            httpOnly:true,
            secure:false,
           maxAge:1000*24*60*60  //1 day
        }
    }
    ))
    res.send("welcome to task manager 📔")
})
 app.use('/auth',authRoute)
app.listen(myport,(req,res)=>{
    console.log(`server running in port ${myport}`)
})


