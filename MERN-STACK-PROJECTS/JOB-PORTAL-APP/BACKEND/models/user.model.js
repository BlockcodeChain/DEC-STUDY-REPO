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