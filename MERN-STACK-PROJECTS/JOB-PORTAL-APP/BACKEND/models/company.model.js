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