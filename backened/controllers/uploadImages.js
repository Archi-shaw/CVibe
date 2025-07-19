const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/uploadMiddleware');
const Resume = require('../models/Resume');

const uploadResumeImages = async(req,res) => {
    try {
       upload.fields([{ name: "thumbnail" } , { name: "profileImage"}]) (req,res,async(err) => {
        if(err){
            return res.status(400).json({ message: "Image upload failed" ,error: err.message})
        }
        const resumeId = req.params.id;
        const resume = await Resume.findOne({ _id: resumeId, user: req.user._id})
       if(!resume){
        return res.status(404).json({ message: "Resume not found or unauthorized access"});
       }
       const uploadfolder = path.join(__dirname, '..', 'uploads');
       const baseUrl = `${req.protocol}://${req.get('host')}`


       const newThumbnail = req.files.thumbnailLinks?.[0];
       const newProfileImage = req.files.profileImage?.[0];

      // If the new thumbnail is uploaded, delete the old one 
        
      if(newThumbnail){
        if(resume.thumbnailLinks){
            const oldTHumbnail = path.join(uploadfolder, path.basename(resume.thumbnailLinks));
            if(fs.existsSync(oldTHumbnail)){
                fs.unlinkSync(oldTHumbnail);
            }
        }
        resume.thumbnailLinks = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }
          
     // if new profile image is uploaded elete old me
     if(newProfileImage){
        if(resume.profileinfo?.profilePreviewUrl){
            const oldProfileImage = path.join(uploadfolder,path.basename(resume.profileinfo.profilePreviewUrl));
            if(fs.existsSync(oldProfileImage)){
                fs.unlinkSync(oldProfileImage);
            }
            resume.profileinfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }
     }

    await resume.save();
    return res.status(200).json({
        message: "Image uploaded succesfully",
        thumbnailLinks: resume.thumbnailLinks,
        profilePreviewUrl: resume.profileinfo.profilePreviewUrl,
    })
    }) 

    } catch (error) {
        return res.status(500).json({ message: "Image upload error occured" , error: error.message});
    }
}

module.exports = {
    uploadResumeImages,
}