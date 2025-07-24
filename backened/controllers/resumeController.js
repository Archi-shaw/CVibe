const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');

// @desc Create a new Resume
// @route POST/api/create
// @access Private

const createResume = async(req,res) => {
    try {
        const {title} = req.body;

    //Default Template for Resume
    const defaultResumeData = {
        profileInfo: {
        profileimg: null,
        profilePreviewUrl: "",
        name: "",
        designation: "",
        summary: "",
    },
    contactinfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github:"",
        website: "",
    },
    workexperience:[
        {
            company:"",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
        }
    ],
     education: [
        {
            degree: "",
            instituition: "",
            startDate: "",
            endDate: "",
        }
    ],
    skills:[
        {
            name:"",
            progress:0,
        },
    ],
    projects:[
        {
            title: "",
            description: "",
            github:"",
            livedemo:"",
        },
    ],
    certifications: [
        {
            title: "",
            issuer: "",
            year: "",
        },
    ],
    languages: [
        {
            name: "",
            progress: 0,
        },
    ],
    interest: [""],
        };
    
    const resume = await Resume.create({
        userId: req.user._id,
        title: title,
        ...defaultResumeData,
    })

    res.status(201).json({ resume})

    } catch (error) {
        res.status(500).json({ message: "Server error" , error: error.message})
    }
}


// @desc Get user's Resume
// @route POST/api/resumes
// @access Private

const getUserResumes = async(req,res) => {
    try {
        const resume = await Resume.find({ userId: req.user._id}).sort({ updatedAt: -1});
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Server error" , error: error.message})
    }
}


// @desc Get Resume by Id
// @route POST/api/resumes/:id
// @access Private

const getResumeById = async(req,res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id , userId: req.user._id});
        if(!resume){
            return res.status(404).json({ message: "Resume not found! "})
        }
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Server error" , error: error.message})
    }
}


// @desc Update existing Resume
// @route POST/api/resumes/:id
// @access Private


const updateResume = async(req, res) => {
    try {
        const resumeId = req.params.id.trim(); // 🔥 critical fix
        console.log("Updating resume with ID:", req.params.id);
        console.log("Update body:", req.body);

        const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found!" });
        }

 Object.assign(resume, req.body);
        const SavedResume = await resume.save();
        console.log("Updated resume saved:", SavedResume);

        res.status(200).json(SavedResume);
    } catch (error) {
        console.error("Update resume error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// @desc Delete existing Resumes
// @route POST/api/delete/:id
// @access Private

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found!" });
        }

        // Delete the thumbnail file if it exists
        if (resume.thumbnailLinks) {
            const uploadsFolder = path.join(__dirname, '..', 'uploads', 'resumes');
            const thumbnailPath = path.join(uploadsFolder, resume.thumbnailLinks);

            if (fs.existsSync(thumbnailPath)) {
                fs.unlinkSync(thumbnailPath);
            }
        }

        // Delete the resume document
        await resume.deleteOne();

        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    createResume ,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
}