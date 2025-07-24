const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    thumbnailLinks: {
        type:String,
    },
    template:{
        type:String,
        colorPaletes: [String],
    },
    profileinfo:{
        profilePreviewUrl: String,
        name: String,
        designation:String,
        summary:String,
    },
    contactinfo: {
        email:String,
        phone:String,
        location:String,
        linkedin: String,
        github:String,
        website:String,
    },
    workexperience:[
        {
            company:String,
            role: String,
            startDate: String,
            endDate: String,
            description: String,
        }
    ],
    education: [
        {
            degree: String,
            instituition: String,
            startDate: String,
            endDate: String,
        }
    ],
    skills:[
        {
            name:String,
            progress:Number,
        },
    ],
    projects:[
        {
            title: String,
            description: String,
            github:String,
            livedemo:String,
        },
    ],
    certifications: [
        {
            title: String,
            issuer: String,
            year: Number,
        },
    ],
    languages: [
        {
            name: String,
            progress: Number,
        },
    ],
    interest: [String],
}, 
{
    timestamps: {createdAt: "createdAt" , updatedAt: "updatedAt"},
}
);

module.exports = mongoose.model("Resume", ResumeSchema); 