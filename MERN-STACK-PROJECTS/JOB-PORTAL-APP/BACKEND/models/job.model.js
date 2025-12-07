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