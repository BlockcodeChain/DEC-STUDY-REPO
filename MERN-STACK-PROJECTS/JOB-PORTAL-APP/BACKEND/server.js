// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import connectDB from './config/db.js';
// const app=express();
// dotenv.config({
//     path:"./.env"
// })
// const myport=process.env.PORT||5000
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())

// const corsoptions={
//     origin:true,
//     credentials:true
// }
// app.use(cors(corsoptions))
// app.listen(myport,(req,res)=>{
//     connectDB();
//     console.log(`Server running at port ${5000}`);
    
// })


import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ===== MIDDLEWARES =====
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ✅ FIXED CORS - Allow all origins during development
app.use(cors({
    origin: true,
    credentials: true
}))

// ===== TEST ROUTE (to check server is working) =====
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" })
})

// ===== API ROUTES =====
app.use('/api/v1/user', userRoutes)

// ===== START SERVER =====
app.listen(PORT, () => {
    connectDB()
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})