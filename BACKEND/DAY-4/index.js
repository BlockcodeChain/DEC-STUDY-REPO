import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
const app=express();
dotenv.config({
    path:"./.env"
})
const myport=process.env.PORT||3000;
// express-session

app.use(session({
    secret:"mysecret",
    saveUninitialized:false,  
    resave:false,
    cookie:{
        myAge:100*60*60*24
    }
}))
app.get('/',(req,res)=>{
    console.log(req.session)
    console.log(req.session.id)
    console.log()
    res.send("hello from day4 express")
})
app.get('/login',(req,res)=>{
    req.session.user={
        name:"ishi",
        email:"ishi@gmail.com",
        age:30,
    }
    res.send(`${req.session.user.name}  loged in`)
})
app.listen(myport,(req,res)=>{
    console.log(`server running in port ${myport}`)
})

// install cookie-parser and (express-session --> midddleware )
// session use krne ke liye config  krna padtha hai 