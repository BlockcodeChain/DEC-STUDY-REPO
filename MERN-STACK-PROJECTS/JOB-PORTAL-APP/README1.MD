# 🚀 Job Portal Backend - Complete Development Guide

**A Beginner-Friendly MERN Stack Project Documentation**

*Perfect for students learning backend development and authentication systems*

---

## 📋 PROJECT OVERVIEW

This is a complete **Job Portal Backend** built with Node.js, Express, MongoDB, and JWT Authentication.

### Features
- ✅ User Registration & Login (Students + Recruiters)
- ✅ JWT-based Authentication
- ✅ Profile Management
- ✅ Company & Job Posting System
- ✅ Application Tracking
- ✅ Secure Password Hashing

### Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, cookie-parser, CORS

---

## 🎯 UNDERSTANDING THE ARCHITECTURE

### What are Models?
Models define how data is structured in the database. Think of them as **blueprints** or **form templates**.

**Real-world Analogy**: Just like a job application form has specific fields (name, email, experience), our database models define what information we can store.

### What is JWT (JSON Web Token)?
JWT is a **digital pass** that proves a user is authenticated.

**How it works:**
1. User logs in with email/password
2. Server creates a JWT token (encrypted user ID)
3. Token is stored in a cookie
4. Every request includes this token
5. Server verifies the token before allowing access

**Analogy**: Like a movie ticket - once verified, you can enter the theatre!

### What is Middleware?
Middleware is a **security guard** that checks requests before they reach controllers.

**Example**: `isAuthenticated` middleware checks if user is logged in before allowing profile updates.

---

## 📂 PROJECT STRUCTURE

```
backend/
│
├── config/
│   └── db.js                    # Database connection
│
├── models/
│   ├── user.model.js            # User schema
│   ├── company.model.js         # Company schema
│   ├── job.model.js             # Job schema
│   └── application.model.js     # Application schema
│
├── controllers/
│   └── user.controller.js       # Business logic
│
├── middleware/
│   └── isAuthenticated.js       # Auth verification
│
├── routes/
│   └── user.routes.js           # API endpoints
│
├── .env                         # Environment variables
├── server.js                    # Entry point
└── package.json                 # Dependencies
```

---

## 🗄️ DATABASE MODELS (SCHEMAS)

### 1. User Model (`user.model.js`)

```javascript
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // No duplicate emails
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],  // Only these 2 roles allowed
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],  // Array: ["React", "Node.js"]
        resume: { type: String },  // Cloudinary URL
        resumeOriginalName: { type: String },
        company: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Company'  // Reference to Company model
        },
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true })  // Adds createdAt & updatedAt automatically

const User = mongoose.model("User", userSchema)
export default User
```

**Key Concepts:**
- `enum`: Restricts values to specific options
- `ref`: Creates relationship between models
- `timestamps`: Auto-generates creation and update times

---

### 2. Company Model (`company.model.js`)

```javascript
import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String  // Cloudinary URL
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Which recruiter registered this company
        required: true
    }
}, { timestamps: true })

const Company = mongoose.model("Company", companySchema)
export default Company
```

**Why this model?**
- Recruiters must register their company first
- Then they can post jobs under that company name
- Links recruiter to their company using `userId`

---

### 3. Job Model (`job.model.js`)

```javascript
import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String  // ["React", "Node.js", "MongoDB"]
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,  // Years of experience
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,  // Number of openings
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",  // Which company posted this
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Which recruiter posted this
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"  // All applications for this job
    }]
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)
export default Job
```

**Relationships:**
- Job → Company (which company)
- Job → User (which recruiter)
- Job → Applications (who applied)

---

### 4. Application Model (`application.model.js`)

```javascript
import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',  // Which job
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Which student applied
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)
export default Application
```

**Status Flow:**
1. Student applies → status: 'pending'
2. Recruiter reviews → status: 'accepted' OR 'rejected'

---

## 🔐 AUTHENTICATION SYSTEM

### Database Connection (`config/db.js`)

```javascript
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ MONGODB CONNECTED SUCCESSFULLY")
    } catch (err) {
        console.log(`❌ MONGODB CONNECTION ERROR: ${err.message}`)
        process.exit(1)  // Stop server if DB fails
    }
}

export default connectDB
```

---

### User Controllers (`controllers/user.controller.js`)

#### 1️⃣ Register Controller

```javascript
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body
        
        // Validation: Check if all fields provided
        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        // Hash password (CRITICAL: Must use await!)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user in database
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (err) {
        console.log(`❌ REGISTER ERROR: ${err.message}`)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}
```

**Security Practices:**
- Never store plain passwords
- Use bcrypt with salt rounds (10 is standard)
- Always use `await` with async functions

---

#### 2️⃣ Login Controller

```javascript
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body

        // Validation
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        // Find user by email
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        // Verify password (CRITICAL: Must use await!)
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        // Verify role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            })
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id
        }
        
        const token = jwt.sign(
            tokenData, 
            process.env.SECRET_KEY, 
            { expiresIn: '7d' }  // Token valid for 7 days
        )

        // Remove password from response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }

        // Send response with cookie
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
                httpOnly: true,  // Prevents XSS attacks
                sameSite: 'strict'  // Prevents CSRF attacks
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            })

    } catch (err) {
        console.log(`❌ LOGIN ERROR: ${err.message}`)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}
```

**JWT Token Explained:**
- `userId`: Encrypted in token
- `expiresIn`: Token expiry time
- Stored in httpOnly cookie for security

---

#### 3️⃣ Logout Controller

```javascript
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })  // Clear cookie
            .json({
                message: "Logged out successfully",
                success: true
            })
    } catch (err) {
        console.log(`❌ LOGOUT ERROR: ${err.message}`)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}
```

---

#### 4️⃣ Update Profile Controller

```javascript
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body
        
        // Get userId from middleware (after authentication)
        const userId = req.id
        
        // Find user
        let user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phonenumber) user.phonenumber = phonenumber
        if (bio) user.profile.bio = bio
        if (skills) {
            // Convert "React,Node.js,MongoDB" to ["React", "Node.js", "MongoDB"]
            user.profile.skills = skills.split(",")
        }

        // Save to database
        await user.save()

        // Remove password from response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (err) {
        console.log(`❌ UPDATE PROFILE ERROR: ${err.message}`)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}
```

---

## 🛡️ AUTHENTICATION MIDDLEWARE

### `middleware/isAuthenticated.js`

```javascript
import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        // Verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        // Add userId to request object
        req.id = decode.userId
        
        // Call next middleware/controller
        next()

    } catch (error) {
        console.log(`❌ AUTH MIDDLEWARE ERROR: ${error}`)
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        })
    }
}

export default isAuthenticated
```

**How it works:**
1. Extracts token from cookie
2. Verifies token using SECRET_KEY
3. Adds userId to request object
4. Calls next function (controller)

**Analogy**: Security guard checking your ID before letting you enter a building.

---

## 🛣️ API ROUTES

### `routes/user.routes.js`

```javascript
import express from 'express'
import { 
    register, 
    login, 
    logout, 
    updateProfile 
} from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()

// Public Routes (anyone can access)
router.post('/register', register)
router.post('/login', login)

// Protected Routes (only logged-in users)
router.get('/logout', isAuthenticated, logout)
router.post('/profile/update', isAuthenticated, updateProfile)

export default router
```

**Route Types:**
- **Public**: No authentication needed
- **Protected**: Must be logged in (middleware checks token)

---

## ⚙️ SERVER SETUP

### `server.js`

```javascript
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
app.use(express.json())  // Parse JSON body
app.use(express.urlencoded({ extended: true }))  // Parse URL-encoded data
app.use(cookieParser())  // Parse cookies

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true  // Allow cookies
}
app.use(cors(corsOptions))

// ===== API ROUTES =====
app.use('/api/v1/user', userRoutes)

// ===== START SERVER =====
app.listen(PORT, () => {
    connectDB()  // Connect to MongoDB
    console.log(`🚀 Server running on port ${PORT}`)
})
```

---

## 📦 INSTALLATION & SETUP

### Step 1: Install Dependencies

```bash
npm install express mongoose dotenv cors cookie-parser bcryptjs jsonwebtoken
```

### Step 2: Create `.env` File

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/jobportal
SECRET_KEY=your_super_secret_key_min_32_characters_long
```

**Security Note**: SECRET_KEY should be:
- At least 32 characters
- Random and complex
- Never shared publicly

### Step 3: Run MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### Step 4: Start Server

```bash
npm start
```

Expected Output:
```
🚀 Server running on port 5000
✅ MONGODB CONNECTED SUCCESSFULLY
```

---

## 🧪 API TESTING (POSTMAN)

### 1. Register User

```
POST http://localhost:5000/api/v1/user/register

Headers:
Content-Type: application/json

Body (JSON):
{
    "fullname": "John Doe",
    "email": "john@example.com",
    "phonenumber": "9876543210",
    "password": "password123",
    "role": "student"
}

Expected Response:
{
    "message": "Account created successfully",
    "success": true
}
```

---

### 2. Login

```
POST http://localhost:5000/api/v1/user/login

Body (JSON):
{
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
}

Expected Response:
{
    "message": "Welcome back John Doe",
    "user": {
        "_id": "...",
        "fullname": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "profile": {...}
    },
    "success": true
}

Note: Token stored in cookie automatically
```

---

### 3. Update Profile (Protected Route)

```
POST http://localhost:5000/api/v1/user/profile/update

Headers:
Cookie: token=<token_from_login>

Body (JSON):
{
    "fullname": "John Updated",
    "bio": "Full Stack Developer passionate about MERN",
    "skills": "React,Node.js,MongoDB,Express"
}

Expected Response:
{
    "message": "Profile updated successfully",
    "user": {...},
    "success": true
}
```

---

### 4. Logout

```
GET http://localhost:5000/api/v1/user/logout

Headers:
Cookie: token=<token_from_login>

Expected Response:
{
    "message": "Logged out successfully",
    "success": true
}
```

---

## 🐛 COMMON ERRORS & SOLUTIONS

### Error 1: "await is only valid in async function"

**Problem**: Forgot to use `await` with bcrypt or other async operations

```javascript
// ❌ Wrong
const hashedPassword = bcrypt.hash(password, 10)

// ✅ Correct
const hashedPassword = await bcrypt.hash(password, 10)
```

---

### Error 2: "Cannot set headers after they are sent"

**Problem**: Multiple response sends in same function

```javascript
// ❌ Wrong
res.json({message: "Error"})
res.json({message: "Another error"})

// ✅ Correct
return res.json({message: "Error"})  // Use return
```

---

### Error 3: "jwt malformed"

**Problem**: Token format incorrect or not sent

**Solution**: Ensure cookie is sent with requests in Postman

---

### Error 4: "Cast to ObjectId failed"

**Problem**: Invalid MongoDB ID format

```javascript
// ✅ Validate before querying
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" })
}
```

---

### Error 5: "User is not defined"

**Problem**: Wrong import path or model name

```javascript
// ❌ Wrong
import user from "../models/user.model.js"

// ✅ Correct (capital U)
import User from "../models/user.model.js"
```

---

## 🔑 KEY LEARNINGS

### 1. Models
- Define database structure
- Use `mongoose.Schema.Types.ObjectId` to link models
- `ref` creates relationships between collections

### 2. Controllers
- Handle business logic
- Always validate input
- Use try-catch for error handling
- Return consistent response format

### 3. Middleware
- Runs before controllers
- Used for authentication, validation, logging
- Must call `next()` to continue

### 4. JWT Authentication
- Stateless authentication
- Token stored in httpOnly cookie
- Verified on each protected route

### 5. Security Best Practices
- Hash passwords with bcrypt
- Use httpOnly cookies (prevents XSS)
- Use sameSite: strict (prevents CSRF)
- Never expose SECRET_KEY
- Validate all inputs

---

## 🎯 NEXT STEPS TO BUILD

1. **Company Routes**
   - POST /company/register
   - GET /company/get/:id
   - PUT /company/update/:id

2. **Job Routes**
   - POST /job/post
   - GET /job/get/:id
   - GET /job/getall
   - GET /job/getadminjobs

3. **Application Routes**
   - POST /application/apply/:id
   - GET /application/get
   - GET /application/applicants/:id
   - PUT /application/status/:id

4. **File Upload**
   - Integrate Cloudinary
   - Upload resume & profile photo
   - Store URLs in database

5. **Advanced Features**
   - Email verification
   - Password reset
   - Search & filter jobs
   - Pagination

---

## 📚 LEARNING RESOURCES

- **Mongoose Docs**: https://mongoosejs.com/docs/
- **JWT**: https://jwt.io/introduction
- **Express**: https://expressjs.com/
- **bcrypt**: https://www.npmjs.com/package/bcryptjs

---

## 💡 TIPS FOR BEGINNERS

1. **Understand the Flow**
   ```
   Request → Route → Middleware → Controller → Model → Database
   ```

2. **Always Use Async/Await**
   - Database operations are asynchronous
   - Don't forget `await` keyword

3. **Error Handling is Critical**
   - Wrap everything in try-catch
   - Send meaningful error messages

4. **Test Incrementally**
   - Test each route after creating
   - Don't build everything at once

5. **Read Error Messages**
   - MongoDB errors are descriptive
   - Console.log is your friend

---

## 🤝 CONTRIBUTION

Found bugs? Want to improve?
- Fork the repository
- Create feature branch
- Submit pull request

---

## 📄 LICENSE

MIT License - Feel free to use for learning and projects

---

## 👨‍💻 AUTHOR

**Your Name**
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: [Your Email]

---

**⭐ If this helped you, please give it a star on GitHub!**

**🔗 Connect with me on LinkedIn for more MERN stack content**

---

*Last Updated: December 2024*
*Version: 1.0.0*

---

## 📊 PROJECT STATS

- **Lines of Code**: ~500+
- **Models**: 4 (User, Company, Job, Application)
- **Routes**: 4 (Register, Login, Logout, Update)
- **Learning Time**: 2-3 days for beginners
- **Difficulty**: Intermediate

---

**Happy Coding! 🚀**