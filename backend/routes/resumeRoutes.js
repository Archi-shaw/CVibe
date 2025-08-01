const express = require('express');
const {
    createResume ,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
}
 = require('../controllers/resumeController');
 const {protect} = require('../middlewares/authMiddleware');
const { uploadResumeImages } = require('../controllers/uploadImages');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();


router.post(
  '/:id/upload-images',
  protect,
  upload.fields([{ name: "thumbnail" }, { name: "profileImage" }]), // <-- ADD THIS
  uploadResumeImages
);

router.post('/', protect,createResume);
router.get('/', protect,getUserResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;

