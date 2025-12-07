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